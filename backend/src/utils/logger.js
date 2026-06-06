const timestamp = () => new Date().toISOString();

const format = (level, msg, err) => {
  const base = `[${level}] ${timestamp()} - ${msg}`;
  if (err && err.stack) return `${base}\n${err.stack}`;
  if (err) return `${base} ${JSON.stringify(err)}`;
  return base;
};

export default {
  info: (msg) => console.log(format('INFO', msg)),
  warn: (msg) => console.warn(format('WARN', msg)),
  error: (msg, err) => console.error(format('ERROR', msg, err)),
};
