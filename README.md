flowchart TD
%% Define swimlanes
subgraph Browser["🧑‍💻 Browser (User)"]
A1[User enters email\nand clicks Login]
A2[Clicks magic link\nfrom email]
A3[Redirected to /auth/verify\nwith ?token=...]
A4[Homepage loads\n(Protected App)]
end

    subgraph Frontend["🌐 Next.js Frontend"]
        F1[GET /api/auth/request-link?email]
        F2[Redirect user to\n/magic-link-sent page]
        F3[POST /api/auth/token-validation\nwith {token}]
        F4[Backend sets httpOnly cookie\nFrontend stores no token]
        F5[Call /api/auth/me\n(load user & role)]
        F6[Redirect based on role:\nCLIENT → /customer/home\nOWNER → /owner/dashboard]
    end

    subgraph Backend["🛠️ Express Backend"]
        B1[Validate email\nCheck if user exists]
        B2[Create magic token\nStore in DB with expiry]
        B3[Send magic link email]
        B4[Validate magic token]
        B5[Create JWT session token\n(exp 15 min)]
        B6[res.cookie('session', jwtToken)]
        B7[Validate JWT from cookie\n(Session check)]
        B8[Return user data]
    end

    %% Arrows between lanes
    A1 --> F1
    F1 --> B1
    B1 --> B2
    B2 --> B3
    B3 --> F2

    A2 --> A3
    A3 --> F3
    F3 --> B4
    B4 --> B5
    B5 --> B6
    B6 --> F4

    A4 --> F5
    F5 --> B7
    B7 --> B8
    B8 --> F6
