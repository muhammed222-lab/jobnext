// Simple Node.js script to test file URL generation
const { ConvexHttpClient } = require('convex/browser');
const { api } = require('../convex/_generated/api.js');

async function getFileUrls(storageIds) {
  // Check if we have the Convex URL
  const convexUrl = process.env.VITE_CONVEX_DEPLOYMENT_URL || process.env.VITE_CONVEX_URL;
  if (!convexUrl) {
    console.error('❌ Convex URL environment variable is not set');
    console.log('Please set VITE_CONVEX_DEPLOYMENT_URL or VITE_CONVEX_URL to your Convex deployment URL');
    console.log('Current .env has VITE_CONVEX_DEPLOYMENT_URL:', process.env.VITE_CONVEX_DEPLOYMENT_URL);
    return [];
  }
  
  const client = new ConvexHttpClient(convexUrl);
  
  const results = [];
  
  for (const storageId of storageIds) {
    try {
      // Use the file upload mutation to get URLs
      const url = await client.mutation(api.fileUpload.getStorageFileUrl, { 
        storageId: storageId
      });
      results.push({ storageId, url });
      console.log(`✅ ${storageId} -> ${url}`);
    } catch (error) {
      console.error(`❌ ${storageId} -> Error: ${error.message}`);
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

// Run the test
console.log('Testing file URL generation...');
console.log('='.repeat(50));

getFileUrls(testStorageIds).then(results => {
  console.log('\nResults:');
  console.log('='.repeat(50));
  results.forEach(result => {
    console.log(`${result.storageId}: ${result.url || 'Failed to get URL'}`);
  });
}).catch(error => {
  console.error('Script failed:', error.message);
});