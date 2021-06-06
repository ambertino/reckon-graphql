import { submitResult } from '../../services/text.svc';

async function submitResultsResolver(parent, args) {
  await submitResult(args.results);
  return true;
}

export default {
  submitResults: submitResultsResolver,
};
