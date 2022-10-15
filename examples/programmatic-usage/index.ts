import { router } from "18h";
import path from "path";

/**
 * This creates a router at 0.0.0.0:8000 and installs
 * all the routes at the `routes/` sub-folder.
 */
router({
  port: 8000,
  routesFolder: path.join(__dirname, "routes")
})