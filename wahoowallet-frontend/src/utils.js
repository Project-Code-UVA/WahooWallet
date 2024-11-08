export const getImageUrl = (path) => {
    return new URL(`/assets/${path}`, import.meta.url).href;
}; 
/* this is taking a relative path that we are passing into it, it is taking the base URL of our website, 
appending the assets path on it, and passing back whatever URL it is. Makes it easier
to dynamically import images into our different components */