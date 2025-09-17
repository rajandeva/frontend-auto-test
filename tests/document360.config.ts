import { devices, Project } from "@playwright/test";


export interface Document360Projects extends Project {
    name: string;
}

function getAllProjects(): Document360Projects[] {
    const trace = process.env.CI ? 'on' : 'on-first-retry';
    const defaultInverts = [/@flaky/, /@skip/];
    const webDevice = {
        use: {
            ...devices['Desktop Chrome'],
            channel: 'chrome',
            trace,
            headless: true,
            screenshot: 'only-on-failure'
        },
        grepInvert: defaultInverts,
    }

    const mobileDevice = {
        use: {
            ...devices['Pixel 7'],
            channel: 'chrome',
            trace,
            headless: true,
            screenshot: 'only-on-failure'
        },
        grepInvert: defaultInverts,
    }
    
    const allProjects: Document360Projects[] = [
        {
            name: 'Web Chrome - Default',   
            ...webDevice,
            grepInvert: [],
        },
        {
            name: 'Mobile Chrome - Default',
            ...mobileDevice,
            grepInvert: [],
        }
    ]
    return allProjects;
}

export function getProjectsToTest(filters: Array<(project: Document360Projects) => boolean>): Project[] {
    const allProjects = getAllProjects();
    const selectedProjects = allProjects.filter(project =>
        filters.some(filter => filter(project))
    );
    if (selectedProjects.length === 0) {
        throw new Error('No projects selected for testing. Please check the project filter criteria.');
    }
    return selectedProjects;
}

// Example usage:
// const projects = getProjectsToTest([
//     project => project.name.startsWith('Web'),
//     project => project.name.includes('Mobile')
// ]);