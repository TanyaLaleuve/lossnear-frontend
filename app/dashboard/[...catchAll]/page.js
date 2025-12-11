
import { notFound } from "next/navigation";
// Route catch-all pour /dashboard afin d'afficher le not-found dans le layout Dashboard (avec la sidebar).
export default function DashboardCatchAllPage() {

  return notFound();
}
