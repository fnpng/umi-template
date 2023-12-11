export default (config: { mock?: boolean; setup: () => void }) => {
  const { mock = process.env.UMI_ENV === 'mock', setup } = config;
  if (mock === false) return;
  setup();
};
