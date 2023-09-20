import { Storage } from 'aws-amplify';
import { Document } from 'langchain'; // Importing the Document from langchain

// Fetch document from AWS Amplify Storage
async function fetchDocumentFromAmplify(docLocation: string): Promise<string> {
    try {
        const signedURL = await Storage.get(docLocation);
        const response = await fetch(signedURL);
        const docContent = await response.text();
        return docContent;
    } catch (error) {
        console.error("Error fetching document from Amplify:", error);
        throw error;
    }
}

// Amplify Loader class
export class AmplifyLoader {
    private docLocations: string[];

    constructor(docLocations: string[]) {
        this.docLocations = docLocations;
    }

    async load(): Promise<Document[]> {
        const rawDocs = await Promise.all(this.docLocations.map(async (location) => {
            return await fetchDocumentFromAmplify(location);
        }));

        // Convert rawDocs to langchain's Document format
        const docs: Document[] = rawDocs.map(rawDoc => {
            return new Document({
                pageContent: rawDoc,
                metadata: {
                    source: 'AWS Amplify Storage' // You can adjust this metadata as needed
                }
            });
        });

        return docs;
    }
}
