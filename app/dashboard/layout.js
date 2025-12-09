import ServerList from "../components/dashboard/ServerList";


export const metadata = {
    title: "LossNear | Dashboard",
    description: "Dashboard de LossNear - Gérez le bot LossNear facilement",
};

export default function DashboardLayout({ children }) {
    return (
        <>
            <div>
                <ServerList />
                {children}
            </div>
        </>
    );
}
