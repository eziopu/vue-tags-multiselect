export default function (props, context, composables, deps = {}) {
  composables.forEach((composable) => {
    if (composable) {
      deps = {
        ...deps,
        ...composable(props, context, deps),
      };
    }
  });
  return deps;
}
