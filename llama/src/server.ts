import app from "./app";
const port = 4000;
async function main() {
  try {
    app.listen(port, () => {
      console.log(`Llama practise project running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
