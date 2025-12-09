import DashboardShell from "./DashboardShell";


export const metadata = {
    title: "LossNear | Dashboard",
    description: "Dashboard de LossNear - Gérez le bot LossNear facilement",
};

export default function DashboardLayout({ children }) {
    return (
        <>
            <DashboardShell>{children}</DashboardShell>
        </>
    );
}
