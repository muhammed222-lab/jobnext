import { ConvexHttpClient } from 'convex/browser';
import { api } from '../convex/_generated/api';

// Create a function to get file URLs from storage IDs
async function getFileUrls(storageIds: string[]) {
  // Check if we have the Convex URL
  if (!process.env.VITE_CONVEX_URL) {
    console.error('❌ VITE_CONVEX_URL environment variable is not set');
    console.log('Please set VITE_CONVEX_URL to your Convex deployment URL');
    return [];
  }
  
  const client = new ConvexHttpClient(process.env.VITE_CONVEX_URL);
  
  const results: { storageId: string; url: string | null }[] = [];
  
  for (const storageId of storageIds) {
    try {
      // Use 'as any' to bypass TypeScript type checking for storage IDs
      const url = await client.mutation(api.fileUpload.getStorageFileUrl, {
        storageId: storageId as any
      });
      results.push({ storageId, url });
      console.log(`✅ ${storageId} -> ${url}`);
    } catch (error) {
      console.error(`❌ ${storageId} -> Error: ${(error as Error).message}`);
      results.push({ storageId, url: null });
    }
  }
  
  return results;
}

// Test with the file IDs you provided
const testStorageIds = [
  'kg22dcavq6p5hm9p568z4mxc7n7q8ga5', // ID Card Back
  'kg2dk280p32yk2xtav4p31kfsh7q9a9z'  // ID Card Front
];

// Export the function for use in other scripts
export { getFileUrls, testStorageIds };

// Run if this file is executed directly
if (require.main === module) {
  console.log('Testing file URL generation...');
  console.log('='.repeat(50));
  
  getFileUrls(testStorageIds).then(results => {
    console.log('\nResults:');
    console.log('='.repeat(50));
    results.forEach(result => {
      console.log(`${result.storageId}: ${result.url || 'Failed to get URL'}`);
    });
  });
}