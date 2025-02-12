// Helper function to handle fetch responses
export const handleResponse = async (response: Response) => {
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};
