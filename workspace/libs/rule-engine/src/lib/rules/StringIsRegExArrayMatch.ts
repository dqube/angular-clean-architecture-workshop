import { CompositeRule } from './CompositeRule';
import { IsNotNullOrUndefined, IsTrue } from './rules';

/**
 * Use this rule to determine if the string value matches the specified
 * regular expression.
 */
export class StringIsRegExArrayMatch extends CompositeRule {
  /**
   * The constructor for the [IsNotNullOrUndefined] rule.
   * @param name The name of the rule.
   * @param message The message to display when the rule is violated.
   * @param target The target that the rules are evaluated against.
   * @param isDisplayable: Indicates if the rule violation is displayable. Default value is [false].
   */
  constructor(name: string, message: string, private target: string, private expressions: RegExp[], isDisplayable: boolean) {
    super(name, message, isDisplayable);
    this.configureRules();
  }

  /**
   * Use to configure the rules to be evaluated.
   */
  private configureRules() {
    const showRuleViolations = true;
    const doNotShowRuleViolation = false;

    // determine if the target is a valid object;
    this.rules.push(new IsNotNullOrUndefined('StringIsNotNullOrUndefined', 'The target value is null or undefined.', this.target, doNotShowRuleViolation));
    if (this.target) {
      this.expressions.forEach(e => {
        this.rules.push(
          new IsTrue('StringIsReExMatch', `The target value does not match the regular expressions: \\${e}\\`, e.test(this.target), showRuleViolations)
        );
      });
    }
  }
}
