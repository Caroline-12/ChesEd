// Get the API URL, handling trailing slashes
export const getApiUrl = () => {
  const apiUrl = import.meta.env.VITE_API_URL?.endsWith('/')
    ? import.meta.env.VITE_API_URL.slice(0, -1)
    : import.meta.env.VITE_API_URL || 'http://localhost:3500';
  return apiUrl;
};

// Get the full profile photo URL
export const getProfilePhotoUrl = (user) => {
  if (!user?.profilePhoto) return '/default-avatar.png';
  if (user.profilePhoto.startsWith('http')) return user.profilePhoto;
  return `${getApiUrl()}${user.profilePhoto}`;
};

// Handle image loading errors
export const handleImageError = (e, user) => {
  console.log(`Image load error for user ${user?.firstName}:`, e);
  e.target.src = '/default-avatar.png';
  e.target.onerror = null; // Prevent infinite loop
};

// Get initials for avatar fallback
export const getInitials = (user) => {
  if (!user) return '';
  return `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`;
};
