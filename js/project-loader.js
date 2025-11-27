// Helper to get URL params (e.g. ?id=test6)
export function getModelID() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id'); // Returns 'test6' or null
}

// Helper to construct paths dynamically
export function getPaths(modelID) {
    const basePath = `../models/${modelID}`;
    return {
        base: basePath,
        manifest: `${basePath}/phase_manifest_${modelID}.json`,
        dataMap: `${basePath}/data_map.json`,
        // Helper to get glb path from a phase name
        getGLBPath: (phaseName) => `${basePath}/${phaseName}.glb`
    };
}

// Helper to load the JSON Manifest
export async function loadProjectManifest(modelID) {
    const paths = getPaths(modelID);
    try {
        const response = await fetch(paths.manifest);
        if (!response.ok) throw new Error(`Manifest not found for ${modelID}`);
        return await response.json();
    } catch (e) {
        console.error(e);
        alert(`Error loading project: ${modelID}. Check console.`);
        return null;
    }
}