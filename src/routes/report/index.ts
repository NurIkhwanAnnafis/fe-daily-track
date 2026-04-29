import { createFileRoute } from "@tanstack/react-router";
import Report from "../../pages/report/Report";

export const Route = createFileRoute('/report/')({
  component: Report,
})