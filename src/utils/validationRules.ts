export default {
  required: (v: string) => !!v || 'Required.',
  length255: (v: string) => (v && v.length <= 255) || 'Must be less than 256 characters',
  number: (v: string) => (!v || !isNaN(parseFloat(v))) || 'Must be a number',
  decimal: (v: string) => (!v || v.indexOf('.') < 0 || v.indexOf('.') >= 0 &&
    v.substring(v.indexOf('.') + 1).length < 3) || 'Must be a valid amount',
  positive: (v: string) =>  (!v || parseFloat(v) > 0) || 'Must be greater than 0',
};
