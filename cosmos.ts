const options: Options = {
  wallThickness: 4,
  wallShrouding: 0,
  webThickness: 0,
  webMinThicknessFactor: 0.8,
  keyBasis: "xda",
  screwIndices: [-1, -1, -1, -1, -1, -1, -1],
  screwType: "screw insert",
  screwSize: "M3",
  screwCountersink: true,
  rounded: {},
  connector: "trrs",
  connectorSizeUSB: "average",
  connectorIndex: -1,
  microcontroller: "waveshare-rp2040-zero",
  fastenMicrocontroller: true,
  verticalClearance: 0.1,
  clearScrews: true,
  shell: { type: "basic", lip: false }
}
// NOTE: Screws / the connector with
// negative indices are placed automatically.
// In the basic/advanced tab, these values were:
// screwIndices: [37.5, 7.5, 27.5, 2.5, 32.5, 12.5, 23.5]
// connectorIndex: 20.2

const curvature = {
  curvatureOfColumn: 0,
  curvatureOfRow: 0,
  spacingOfRows: 20.5,
  spacingOfColumns: 21.5,
  arc: 0
}

/**
 * Useful for setting a different curvature
 * for the pinky keys.
 */
const pinkyCurvature = {
  ...curvature,
  curvatureOfColumn: 15
}

/**
 * The plane used to position the upper keys.
 * It's rotated by the tenting and x rotation
 * then translated by the z offset.
 */
const upperKeysPlane = new Trsf()
  .rotate(0, [0, 0, 0], [0, 1, 0], false)
  .rotate(0, [0, 0, 0], [1, 0, 0], false)
  .translate(0, 0, 0, false)

/** Definitions for the upper keys. */
const fingers: Key[] = [
  {
    type: "cirque-40mm",
    aspect: 1,
    cluster: "fingers",
    size: { sides: 20 },
    position: new Trsf()
      .placeOnMatrix({
        ...curvature,
        column: 0.5,
        row: 1
      })
      .translate(0, 0, 0)
      .translate(-10, 0, 0)
      .transformBy(upperKeysPlane)
      .rotateTowards([0, 0, 1], 0.8)
  },
  {
    type: "blank",
    aspect: 1,
    size: {
      width: 55,
      height: 10

    },
    cluster: "fingers",
    position: new Trsf()
      .placeOnMatrix({
        ...curvature,
        curvatureOfColumn: 0,
        column: 0,
        row: -1.5
      })
      .translate(0, 0, 0)
      .transformBy(upperKeysPlane)
  },
  {
    type: "mx-better",
    keycap: {
      profile: "xda",
      row: 3,
      home: "index",
      letter: "j"
    },
    aspect: 1,
    cluster: "fingers",
    position: new Trsf()
      .placeOnMatrix({
        ...curvature,
        column: -1,
        row: -0.5
      })
      .translate(0, 0, 0)
      .transformBy(upperKeysPlane)
  },
  {
    type: "mx-better",
    keycap: {
      profile: "xda",
      row: 3,
      home: "middle",
      letter: "k"
    },
    aspect: 1,
    cluster: "fingers",
    position: new Trsf()
      .placeOnMatrix({
        ...curvature,
        column: 0,
        row: -0.5
      })
      .translate(0, 2.8, -4)
      .transformBy(upperKeysPlane)
  },
  {
    type: "mx-better",
    keycap: {
      profile: "xda",
      row: 3,
      home: "ring",
      letter: "l"
    },
    aspect: 1,
    cluster: "fingers",
    position: new Trsf()
      .placeOnMatrix({
        ...curvature,
        column: 1,
        row: -0.5
      })
      .translate(0, 0, 0)
      .transformBy(upperKeysPlane)
  },
  {
    type: "mx-better",
    keycap: {
      profile: "xda",
      row: 3,
      home: "pinky",
      letter: ";"
    },
    aspect: 1,
    cluster: "fingers",
    position: new Trsf()
      .placeOnMatrix({
        ...pinkyCurvature,
        column: 2,
        row: -0.5
      })
      .translate(0, -13, 6)
      .transformBy(upperKeysPlane)
  },
]

/**
 * The plane used to position the thumbs.
 * It's defined using a nearby key position,
 * then offset by some amount.
 */
const thumbOrigin = new Trsf()
  .rotate(0, [0, 0, 0], [1, 0, 0])
  .rotate(-70, [0, 0, 0], [0, 1, 0])
  .rotate(0, [0, 0, 0], [0, 0, 1])
  .translate(-25, 0, 0)
  .translateBy(new Trsf()
    .placeOnMatrix({
      ...curvature,
      row: 0.5,
      column: -1
    })
    .transformBy(upperKeysPlane)
    .translate(8.75, -8.75, 0)
  )
  .rotate(0, [0, 0, 0], [0, 0, 1])
  .translate(0, 0, 0)

/** The curvature of the thumb cluster. */
const thumbCurvature = {
  curvatureOfRow: 0,
  curvatureOfColumn: 0,
  spacingOfColumns: 20,
  spacingOfRows: 20
}

const thumbs: Key[] = [
  {
    type: "mx-better",
    keycap: {
      profile: "xda",
      row: 5,
      letter: " ",
      home: "thumb"
    },
    cluster: "thumbs",
    aspect: 1,
    position: new Trsf()
      .rotate(0, [0, 0, 0], [1, 0, 0])
      .rotate(0, [0, 0, 0], [0, 1, 0])
      .rotate(0, [0, 0, 0], [0, 0, 1])
      .placeOnMatrix({
        ...thumbCurvature,
        column: 0,
        row: 0
      })
      .translate(0, 0, 0)
      .transformBy(thumbOrigin)
  },
  {
    type: "mx-better",
    keycap: { profile: "xda", row: 5 },
    cluster: "thumbs",
    aspect: 1,
    position: new Trsf()
      .rotate(0, [0, 0, 0], [1, 0, 0])
      .rotate(0, [0, 0, 0], [0, 1, 0])
      .rotate(0, [0, 0, 0], [0, 0, 1])
      .placeOnMatrix({
        ...thumbCurvature,
        column: 0,
        row: 1
      })
      .translate(0, 0, 0)
      .transformBy(thumbOrigin)
  }
]

const wristRestOrigin = new Trsf()
  .translateBy(new Trsf()
    .placeOnMatrix({
      ...curvature,
      row: 0.5,
      column: -1
    })
    .transformBy(upperKeysPlane)
    .translate(8.75, -8.75, 0)
  )
  .rotate(0, [0, 0, 0], [0, 0, 1])
  .translate(4, -5, 4)

export default {
  ...options,
  wristRestOrigin,
  keys: [...fingers, ...thumbs],
}
