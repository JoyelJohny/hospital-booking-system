export function getTimings(sTime: string, eTime: string) {
    let [sHour, sMin] = sTime.split(":")
    let [eHour, eMin] = eTime.split(":")

    const sHourNum = Number(sHour)
    const eHourNum = Number(eHour)
    const sPeriod = sHourNum > 12 ? "pm" : "am"
    const ePeriod = eHourNum > 12 ? "pm" : "am"

    const sHour12 = (sHourNum % 12 || 12).toString().padStart(2, '0')
    const eHour12 = (eHourNum % 12 || 12).toString().padStart(2, '0')

    return `${sHour12}:${sMin} ${sPeriod} - ${eHour12}:${eMin} ${ePeriod}`
}