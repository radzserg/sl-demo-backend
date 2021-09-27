import * as cp from "child_process";
import * as http from "http";

let prismProc: cp.ChildProcess;

export async function startPrism(appUrl: string, oasSpecPath: string) {
  console.log(["proxy", "-h", `localhost`, "-p", `4010`, oasSpecPath, appUrl].join(' '));
  prismProc = cp.spawn("prism", [
    "proxy",
    "-h",
    "localhost",
    "-p",
    "4010",
    oasSpecPath,
    appUrl,
  ]);
  prismProc.stdout!.pipe(process.stdout);
  prismProc.stderr!.pipe(process.stderr);

  let attemptCount = 0;

  while (true) {
    let prismIsUp = false;

    try {
      prismIsUp = await getHealth(`http://localhost:4010/health`);
    } catch {}

    if (!prismIsUp) {
      console.log("Waiting for prism; sleeping 1 second...");
      await sleep(1000);
      attemptCount++;

      // try for one minute
      if (attemptCount > 60) {
        throw new Error(
          "Failed to start prism against the target environment!"
        );
      }
    } else {
      console.log("Prism is up and running!");
      break;
    }
  }
}

export function killPrism() {
  console.log(`Killing prism server with PID: ${prismProc.pid}`);
  prismProc.kill("SIGINT");
}

async function getHealth(url: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    let req = http.get(url);

    req.on("response", (res) => {
      resolve(res.statusCode === 200);
    });

    req.on("error", (err) => {
      reject(err);
    });
  });
}

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
