import NoSSRWrapper from "../../components/NoSSR"

export const metadata = {
    title: 'Employee',
    description: 'Employee related activities',
}

export default function RootLayout({ children }) {

    return (
        <NoSSRWrapper>
            <div className='employee-container'>
                {children}
            </div>
        </NoSSRWrapper>
    );
}

