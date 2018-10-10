const fs = require("fs");
const papaparse = require("papaparse");
const request = require("superagent");
const mdify = require("mdify");
const _ = require("lodash");

const TO_MIGRATE_FILE = "./migration/to-migrate.csv";
const defaultData = {
  templateKey: "candidate-fragment",
  electionType: "primary",
  office: "house",
  incumbent: false,
  outcome: "Lost"
};

const go = async () => {
  const response = await request
    .get("https://api.cosmicjs.com/v1/brand-new-congress/objects")
    .query({ type: "candidates", status: "all" });

  const cosmicData = _.fromPairs(
    response.body.objects.map(c => {
      const slug = c.slug;
      return [slug, c.metadata.website_blurb];
    })
  );

  const images = fs.readdirSync("./static/img");

  const toMigrate = papaparse
    .parse(fs.readFileSync(TO_MIGRATE_FILE).toString())
    .data.filter(([info, ...rest]) => info)
    .map(([info, primaryDate, websiteRaw]) => {
      const [location, name] = info.split(":").map(s => s.trim());
      const [lastName, ...firstName] = name.split(" ").reverse();
      const [state, district] = location.split("-");

      const slug = name
        .toLowerCase()
        .replace(/[ ]/g, "-")
        .replace(/['\.]/g, "")
        .replace("ñ", "n");

      const markdown = cosmicData[slug];
      const imageMatches = images.filter(img =>
        img.includes(slug.replace(/-/g, ""))
      );

      if (imageMatches.length == 0) {
        console.log(imageMatches);
        console.log(slug);
      }

      const image = `/img/${imageMatches[0]}`;

      if (!markdown) {
        throw new Error(
          `Data missing for ${slug}. Cosmic has ${Object.keys(cosmicData)}`
        );
      }

      const website = websiteRaw.includes("https://")
        ? websiteRaw
        : "https://" + websiteRaw;

      return {
        attributes: Object.assign(
          {
            district,
            state,
            website,
            firstName: firstName.reverse().join(" "),
            lastName,
            title: name,
            image,
            electionDate: primaryDate.replace(/\//g, "-"),
            blurb: markdown
          },
          defaultData
        ),
        slug
      };
    });

  for (let candidate of toMigrate) {
    const contents = mdify.stringify(candidate.attributes, "");
    const toDelete = `./src/pages/candidates/${candidate.slug}`;
    const destination = `./src/pages/candidates/${candidate.slug}.md`;

    if (fs.existsSync(toDelete)) {
      fs.unlinkSync(toDelete);
    }

    fs.writeFileSync(destination, contents);
  }

  return "All good!";
};

go()
  .then(console.log)
  .catch(console.error);
