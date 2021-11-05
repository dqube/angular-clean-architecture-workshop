import { RulePolicy } from './RulePolicy';
import { CompositeRule } from './CompositeRule';

/**
 * This class defines the result of a single rule evaluation.
 */
export class RuleResult {
  /**
   * Use to indicate if the rule result is valid or not.
   */
  isValid = false;

  /**
   * The rule that was evaluated.
   */
  rulePolicy: RulePolicy = new RulePolicy('', '', false);

  /**
   * The rule message to use when the evaluation [isValid] is [false].
   */
  message = '';

  /**
   * The target item that was evaluated by the specified rule policy.
   */
  target?: any;

  /**
   * Constructor for the RuleResult class.
   * @param rulePolicy Use to specify the rule.
   * @param target Use to specify the target to be evaluated by the rule.
   */
  constructor(rulePolicy: RulePolicy, target: any);
  /**
   * Constructor for the RuleResult class.
   * @param rulePolicy Use to specify the rule.
   */
  constructor(rulePolicy: CompositeRule);
  /**
   * Constructor for the RuleResult class.
   * @param rulePolicy Use to specify the rule.
   * @param target Use to specify the target to be evaluated by the rule.
   */
  constructor(rulePolicy: RulePolicy, target?: any) {
    if (rulePolicy != null && rulePolicy.name.length > 0 && rulePolicy.message.length > 0) {
      this.rulePolicy = rulePolicy;
      this.isValid = rulePolicy.isValid;
      this.message = rulePolicy.message;
    }
    this.target = target;
  }
}
