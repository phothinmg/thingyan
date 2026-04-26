import type { SuSeeConfig } from "susee";

const config: SuSeeConfig = {
  // Array of entry point objects.
  // ----------------------------
  entryPoints: [
    // You can add more entry points for different export paths.
    // NOTE: duplicate export paths are not allowed.
    // --------------------------------------------
    {
      // (required) Entry file path.
      entry: "src/index.ts", // replace with your entry file
      // (required) Export path for this entry.
      exportPath: ".", // "." stands for the main export path and can be set to "./foo", "./bar", etc.
      // (optional) Output module formats ["commonjs"] or ["esm", "commonjs"], default: ["esm"].
      // Uncomment the following line to edit.
      format: ["esm", "commonjs"],
      // (optional) Rename duplicate declarations, default: true.
      // Uncomment the following line to edit.
      //renameDuplicates: true,
      // (optional) Custom tsconfig.json path, default: undefined.
      // Uncomment the following line to edit.
      //tsconfigFilePath: undefined,
      // (optional) Array of susee plugins, default: [].
      // Uncomment the following line to edit.
      //plugins: [],
      // (optional) Warning messages, if it true and warning message exist(1), default: false.
      // Uncomment the following line to edit.
      //warning: false,
    },
  ],
  // NOTE: the following options apply to all entry points.
  // ----------------------------------------------------------
  // (optional) Output directory, default: dist.
  // Uncomment the following line to edit.
  //outDir: "dist",
  // (optional) Allow susee to update your package.json, default: false.
  // Uncomment the following line to edit.
  allowUpdatePackageJson: true,
};

export default config;
