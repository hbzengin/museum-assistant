// Service to fetch data from Met Museum API or use local fallback

// Realistic dummy data as requested for MVP/Fallback
const DUMMY_DATA = [
    {
        objectID: 436535,
        title: "Wheat Field with Cypresses",
        artistDisplayName: "Vincent van Gogh",
        objectDate: "1889",
        medium: "Oil on canvas",
        primaryImageSmall: "https://images.metmuseum.org/CRDImages/ep/original/DT1567.jpg",
        description: "A golden field of wheat with tall, dark cypress trees reaching into a swirling blue sky. Painted by Van Gogh during his stay at the asylum in Saint-Rémy."
    },
    {
        objectID: 436121,
        title: "The Death of Socrates",
        artistDisplayName: "Jacques Louis David",
        objectDate: "1787",
        medium: "Oil on canvas",
        primaryImageSmall: "https://images.metmuseum.org/CRDImages/ep/original/DP-15701-001.jpg",
        description: "A dramatic scene showing the philosopher Socrates about to drink poison hemlock, surrounded by his grieving followers. A symbol of principle and resistance."
    },
    {
        objectID: 45734,
        title: "Quilt, Log Cabin pattern",
        artistDisplayName: "Mary A. Stinson",
        objectDate: "ca. 1880",
        medium: "Cotton, wool",
        primaryImageSmall: "https://images.metmuseum.org/CRDImages/ad/original/1980.498_F.jpg",
        description: "A vibrant quilt featuring the 'Log Cabin' pattern, made of contrasting light and dark strips of fabric creating a mesmerizing geometric design."
    },
    {
        objectID: 544502,
        title: "The Great Wave off Kanagawa",
        artistDisplayName: "Katsushika Hokusai",
        objectDate: "ca. 1830–32",
        medium: "Woodblock print; ink and color on paper",
        primaryImageSmall: "https://images.metmuseum.org/CRDImages/as/original/DP130155.jpg",
        description: "The famous woodblock print showing a giant wave threatening boats off the coast of the town of Kanagawa, with Mount Fuji visible in the background."
    }
];

export const MuseumService = {
    // Search for exhibits (Mock implementation for now)
    searchExhibits: async (query) => {
        console.log(`Searching exhibits for: ${query}`);
        // Simple case-insensitive keyword match on dummy data
        const lowerQuery = query.toLowerCase();
        const results = DUMMY_DATA.filter(item =>
            item.title.toLowerCase().includes(lowerQuery) ||
            item.artistDisplayName.toLowerCase().includes(lowerQuery) ||
            item.description.toLowerCase().includes(lowerQuery)
        );
        return results;
    },

    // Get details for a specific object
    getExhibitDetails: async (objectID) => {
        console.log(`Getting details for objectID: ${objectID}`);
        const exhibit = DUMMY_DATA.find(item => item.objectID === objectID);

        if (exhibit) {
            return exhibit;
        }

        // Fallback: Try to fetch from real API if not in dummy data
        try {
            const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`);
            if (response.ok) {
                return await response.json();
            }
        } catch (error) {
            console.error("Failed to fetch from Met API", error);
        }

        return null;
    },

    // Get a random exhibit for "discovery" mode
    getRandomExhibit: async () => {
        const randomIndex = Math.floor(Math.random() * DUMMY_DATA.length);
        return DUMMY_DATA[randomIndex];
    }
};
