export default (config) => {
  const newConfig = config;
  newConfig.title = 'Clawk';
  newConfig.analyzeBundle = false;
  newConfig.viteConfigModifier = (viteConfig) => {
    const newViteConfig = viteConfig;
    newViteConfig.server = newViteConfig.server || {};
    newViteConfig.server.host = '0.0.0.0';
    newViteConfig.server.allowedHosts = true;
    newViteConfig.resolve = newViteConfig.resolve || {};
    newViteConfig.resolve.dedupe = ['react', 'react-dom'];
    return newViteConfig;
  };
  return newConfig;
};
