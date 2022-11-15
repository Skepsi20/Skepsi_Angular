export interface newGrupo{
    planId: string,
    tutorId : string,
    schedule: string,
    capacity: number,
    onMonday: boolean,
    onTuesday: boolean,
    onWednesday: boolean,
    onThursday: boolean,
    onFriday: boolean,
    onSaturday: boolean,
    onSunday: boolean,
    institutionIds: string[],
}