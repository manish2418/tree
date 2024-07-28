import CreateClaimMailTemplate from '@/app/components/CreateClaimMailTeamplate';


export const createClaimSubmissionTemplate = async (data) => {
    const ReactDOMServer = (await import('react-dom/server')).default;
    const template = ReactDOMServer.renderToStaticMarkup(<CreateClaimMailTemplate {...data} />);

    return template
}
