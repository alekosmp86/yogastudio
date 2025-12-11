import { http } from "@/lib/http";
import { ApiType } from "@/enums/ApiTypes";

export const scheduledTasks = [{
    taskName: "Create daily classes",
    run: async () => {
        return await http.post("/admin/classes/daily", ApiType.FRONTEND);
    }
}]