export enum CoreHooks {
    beforeFetchAllAvailableClasses = 'fetchAllAvailableClasses:before',
    afterFetchAllAvailableClasses = 'fetchAllAvailableClasses:after',
    beforeUserCreated = 'userCreated:before',
    afterUserCreated = 'userCreated:after',
    beforeSessionCreated = 'sessionCreated:before',
    afterSessionCreated = 'sessionCreated:after',
    afterReservationCancelled = 'reservationCancelled:after',
    afterAttendanceUpdated = 'attendanceUpdated:after',
}