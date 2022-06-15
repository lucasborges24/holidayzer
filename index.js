import express from 'express';
import cors from 'cors';

const server = express();
server.use(cors());

const holidays = [
    { date: "1/1/2022", name: "Confraternização mundial" },
    { date: "3/1/2022", name: "Carnaval" },
    { date: "4/17/2022", name: "Páscoa" },
    { date: "4/21/2022", name: "Tiradentes" },
    { date: "5/1/2022", name: "Dia do trabalho" },
    { date: "6/16/2022", name: "Corpus Christi" },
    { date: "9/7/2022", name: "Independência do Brasil" },
    { date: "10/12/2022", name: "Nossa Senhora Aparecida" },
    { date: "11/2/2022", name: "Finados" },
    { date: "11/15/2022", name: "Proclamação da República" },
    { date: "12/25/2022", name: "Natal" }
  ];


function Today() {
    const hoje = new Date().toLocaleDateString();
    const isTodayHoliday = holidays.filter(i => i.date === hoje)
    
    if (isTodayHoliday.length === 0) {
        return  "Não, hoje não é feriado"
    } else if (isTodayHoliday.length === 1) {
        return `Sim, hoje é ${isTodayHoliday[0].name}`
    }
}

function getHolidaysMonth(id) {
    
    const holidaysInIdMonth = holidays.filter(i =>  id === i.date.split("/")[0])
    const daysHolidaysInIdMonth = holidaysInIdMonth.map(i => i.name)
    return daysHolidaysInIdMonth
}

server.get("/holidays", (req, res) => {
    const holidaysName = holidays.map(i => i.name)
    res.send(holidaysName)
})

server.get("/is-today-holiday", (req, res) => {
    res.send(Today())
})

server.get("/holidays/:month", (req, res) => {
    const idMonth = req.params.month
    const HolidaysDays = getHolidaysMonth(idMonth)

    res.send(HolidaysDays)
})

server.listen(3000)