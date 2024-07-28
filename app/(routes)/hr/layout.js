import { AppHeader } from "@/app/components/AppHeader";
import NoSSRWrapper from "../../components/NoSSR"

export const metadata = {
    title: 'HR',
    description: 'HR related activities',
}

export default function RootLayout({ children }) {
    return (
        <NoSSRWrapper>
            <div className='hr-container'>
                <AppHeader title="HR" />
                {children}
            </div>
        </NoSSRWrapper>
    );
}

