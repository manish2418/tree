import '../../../styles/index.scss'
import { AppHeader } from "@/app/components/AppHeader";
import NoSSRWrapper from "../../components/NoSSR"

export const metadata = {
    title: 'Claim',
    description: 'Claim related activities',
}

export default function RootLayout({ children }) {
    return (
        <NoSSRWrapper>
            <div className='claim-container'>
                <AppHeader title="Claims" />
                {children}
            </div>
        </NoSSRWrapper>
    );
}

