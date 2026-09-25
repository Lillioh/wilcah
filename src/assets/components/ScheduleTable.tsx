const rows = [
  ["8:00–9:00", "CRS 8 · Lec", "—", "ABM 2 · Lec", "ABM 2 · Lec", "CRS 8 · Lec"], ["9:00–10:00", "CRS 8 · Lab", "—", "—", "ABM 2 · Lab", "—"], ["10:00–11:00", "CRS 8 · Lab", "—", "ABM 2 · Lab", "ABM 2 · Lab", "CRS 8 · Lab"], ["11:00–12:00", "CRS 8 · Lab", "—", "—", "ABM 2 · Lab", "—"], ["1:00–2:00", "—", "—", "—", "ABM 2 · Lec", "—"], ["2:00–5:00", "—", "—", "—", "ABM 2 · Lab", "—"]
];
const days = ["Time", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
export default function ScheduleTable() { return <div className="schedule-wrap"><table><thead><tr>{days.map(day => <th key={day}>{day}</th>)}</tr></thead><tbody>{rows.map((row) => <tr key={row[0]}>{row.map((cell, index) => <td key={`${row[0]}-${index}`} className={cell === "—" ? "empty" : ""}>{cell}</td>)}</tr>)}</tbody></table><p className="schedule-note"><span /> Lecture and lab hours · Current academic term</p></div>; }
