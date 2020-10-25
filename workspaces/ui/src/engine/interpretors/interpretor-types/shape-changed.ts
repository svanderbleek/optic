import { BodyShapeDiff } from '../../parse-diff';
import { Actual, Expectation } from '../shape-diff-dsl';

import { JsonHelper, opticEngine } from '@useoptic/domain';
import { InteractiveSessionConfig } from '../../interfaces/session';
import {
  IInteractionPreviewTab,
  IInterpretation,
} from '../../interfaces/interpretors';

const LearnJsonTrailAffordances = opticEngine.com.useoptic.diff.interactions.interpreters.distribution_aware.LearnJsonTrailAffordances();

export function shapeChangeInterpretor(
  shapeDiff: BodyShapeDiff,
  actual: Actual,
  expected: Expectation,
  services: InteractiveSessionConfig
): IInterpretation {
  const { shapeTrail, jsonTrail } = shapeDiff;

  const additionalKindsObserved = expected.diffActual(actual);

  const tabs: IInteractionPreviewTab[] = actual
    .interactionsGroupedByCoreShapeKind()
    .map((shapeGrouping) => {
      return {
        interactionPointers: shapeGrouping.interactions,
        title: shapeGrouping.label,
        allowsExpand: true,
        renderBody: async (a) => {},
      };
    });

  const union = expected.unionWithActual(actual);
  console.log(union);

  const suggestions = [
    // union Observation Types + Spec Types    -- ignores,
    // union Observations Types                -- ignores    gives you control to remove stuff
  ];

  return { suggestions: [], previewTabs: [] };
}
