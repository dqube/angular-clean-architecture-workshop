# Business Rules and Validation

![Angular Rules Strategy](./resources/ng-rules-strategy-final.png)

Today, most web applications are not simple - especially when they include forms, APIs and a database. Modern web applications now contain complex business rules and data validation requirements. Most business applications collect a fair amount of data. This means that the application or software must verify or validate that the information is correct before making expensive API calls. In addition to this, there may be other business rules that must be evaluated to ensure that the business logic is correct.

Therefore, what is your strategy to implement business rules and data validation? Most likely if you have five developers on your development team you will have five different ways to manage business rules and data validation. Over a period of time, the variance in the implementation of this type of code will create technical debt that will be difficult to overcome. If the application supports revenue generation then it is essential that the code is conventional, consistent, repeatable, and for sure testable.

## Game Plan and Strategy

> Hope is not a good strategy. If you hope the code will just work and the business rules will be fine without any thought or planning, good luck!

There are different sources in your application that may require validation. The validation and business rule strategy may include the Angular form validators. However, this is just the first layer of validation and business rule processing of the application. As the code progresses towards making an API call there are other opportunities for validation and business rule processing. Most likely there will be different types of validation using different mechanism.

I like to imagine a set of safety nets that are layered depending on the layer of the application (UI/UX, UI Services, domain service layers, business logic, and   data access/HTTP calls). This is where it gets interesting. In lower layers of your application you cannot use the reactive form `Validators` that implement the `ValidatorFn` *interface*. Therefore you might want to consider using a rule engine to create a more conventional way to manage validation and business rules.

### Type of Validation and Rules

1. form input (synchronous)
2. asynchronous validation of form input that may include an API operation
3. business logic with business rules
   1. simple rules
   2. complex rules
4. data validation before an API call

Occasionally you might need to create a custom validator for a form input. This custom validator might be synchronous or async. Either way, you will need to write some custom code. The validator must also be testable to verify the results. It should be a [pure function](https://betterprogramming.pub/what-is-a-pure-function-3b4af9352f6f) - see an example [here](https://gist.github.com/wesleygrimes/f5bdf06c5c85fd3c8cb849111b5b3de2).

## Motivation

Two core principles of great software design are [Separation of Concerns (SoC)](https://en.wikipedia.org/wiki/Separation_of_concerns) and [Single Responsibility](https://en.wikipedia.org/wiki/Single_responsibility_principle). Business rules and validation are an integral part of most business applications. There are rules and validations that must occur during processing of business logic. Most applications will combine the business logic with rules and data validation - when this happens, testing and maintaining applications becomes more difficult.

A rule engine allows the application to have a good Separation of Concerns (SOR). A good rule engine allows you to:

+ Quickly start using out-of-the-box rules that are already implemented.
+ Create custom rules that are either simple or composite.
+ Create rules that can be reused throughout the application. Code reuse eliminates copy/paste of common rules.
+ Use a single ValidationContext to add rules, execute rules, and evaluate the rule results. 
+ Use a consistent pattern and mechanism to implement your business rules and data validation.
+ Integrate rules with Reactive Form custom validators (async or sync).


The following diagram shows a strongly-typed Typescript rule engine that allows applications to implement simple or sophisticated business rules as well as data validation. It contains a set of common rules ready for use; as well as a framework and set of classes to create custom rules for Angular applications, components, services, and library projects.

> Do not worry about the complexity of the diagram below. The diagram shows the internal design of the rule engine. The `ValidationContext` provides a simple API to add rules, execute rules, and to retrieve rule results.

![rule engine](resources/diagrams/rule-engine.png)

The rule engine is using a simple design pattern called [Composite](#resources). This was the first library I created using TypeScript in 2016. This was a turning point for me. I was currently using AngularJS. However the new version of Angular 2 was just released and I was interested in its capabilities. One of my concerns was that the new version of angular was using TypeScript. Imagine that was a real concern that I had. I was a little apprehensive about adding a new programming language to my current list.

My thought was that if I could create a reusable library using TypeScript then I would learn Angular 2 along with TypeScript but with a focus on creating reusable libraries for my enterprise web applications.

### International JavaScript Conference (New York 2021)

Well, five years later I am still focused on reusable libraries and Angular 2 or rather just Angular. Next month I will present at the [International JavaScript Conference in New York (September 27-30, 2021) on the topic of Custom Angular Libraries](https://javascript-conference.com/angular/custom-angular-libraries/).

[![](./resources/ijs-ny-2021-matt-vaughn.png)](https://javascript-conference.com/angular/custom-angular-libraries/)

## Why use a rule engine?

+ Provides a consistent way to implement business and validation rules and provide a consistent mechanism to retrieve the results.
+ You can use the existing set of rules already implemented. 
   - AreEqual
   - AreNotEqual
   - GuidIsValid
   - IsFalse
   - IsTrue
   - IsNullOrUndefined
   - IsNotNullOrUndefined
   - Max
   - Min
   - Range
   - StringIsRegExMatch
   - StringIsNotNullEmptyRange
   - StringIsNullEmptyRange
+ You can create a reusable library of custom rules and use them in one or more applications.
+ Combine default with one or more custom rules to create a `CompositeRule` - a rule that contains other rules (rule set).
+ Each rule has a `Priority` property to execute rule sets in a specified sequence. 
+ Take advantage of Typescript classes to quickly create `simple` or `composite` (nested) rules using the API that is part of the framework.
+ Use the `ValidationContext` to simply add, execute, and retrieve rule results.
+ Code faster using Fluent API style syntax - be more productive.
+ Using the `CompositeRule` base class, you can  create a rule that contains other rules of either `simple` or `composite` types. The rule execution algorithm manages the complexity - now you can create rules and reuse rules to match your business logic. 

## ValidationContext
The ValidationContext is the container object for rules. It allows the developer to add, execute and retrieve the results of the evaluated rules. 

+ Add rules by calling the `addRule()` function. 
+ Execute rules by calling the `renderRules()` function.
+ Retrieve the results (a list of RuleResult items) using the `results` public property.

The following code snippet shows import statements and initialization of the `ValidationContext` as a member in the class. 

```ts
import { ValidationContext } from '@buildmotion/rules-engine';
import { ValidationContextState } from '@buildmotion/rules-engine';
...
export class myClass {
    validationContext: ValidationContext = new ValidationContext();

    // implementation details here; 
}
```

The following shows the entire `ValidationContext` class with its implementation details. It is straightforward, you make the calls in the following sequence:

1. `addRule(..)`: Add rules that you want to evaluate.
2. `renderRules()`: Renders all rules added to the ValidationContext.
3. Determine the state of the validation by using either: `hasRuleViolations()` or `isValid()`. Each returns a boolean value indicating the status of the validation context.
4. Retrieve the `ValidationContext.results` which is a array of `RuleResult` items.


### ValidationContext

The `ValidationContext` is the entry point into using the rule engine. It is small but powerful.

```ts
export class ValidationContext implements IValidationContext {
    state: ValidationContextState = ValidationContextState.NotEvaluated;
    results: Array<RuleResult> = new Array<RuleResult>();
    rules: Array<RulePolicy> = new Array<RulePolicy>();
    source: string;

    /**
    * Use this method to add a new rule to the ValidationContext. 
    */
    addRule(rule: RulePolicy) {
        if (this.source) {
            rule.source = this.source;
        }
        this.rules.push(rule);
        return this;
    }
  
    /**
    * Use this method to execute the rules added to the [ValidationContext].
    */
    renderRules(): ValidationContextBase {
        this.results = new Array<RuleResult>();
        if (this.rules && this.rules.length < 1) {
            return this;
        }
        this.rules.sort(r => r.priority).forEach(r => this.results.push(r.execute()));
        return this;
    }

    /**
    * Use to determine if the validation context has any rule violations.
    */
    hasRuleViolations(): boolean {
        var hasViolations = false;
        if (this.rules && this.rules.filter(r => r.isValid === false)) {
            hasViolations = true;
        }
        return hasViolations;
    }

    /**
        * *Use to indicate if the validation context is valid - no rule violations.
        * @returns {}: returns a boolean.
        */
    get isValid(): boolean {
        var isRuleValid: boolean = true;
        if (this.rules) {
            var invalidRulesCount = this.rules.filter(r => r.isValid === false).length;
            if (invalidRulesCount > 0) {
                isRuleValid = false;
            }
        }
        return isRuleValid;
    }
}
  
```

## Adding Rules to the ValidationContext
Using an initialized [ValidationContext] object, you can add rules using a Fluent API syntax. The following example uses existing rules. 

A rule requires:

+ Name: the name of the rule.
+ Message: the text to display if the rule fails.

```ts
  this.validationContext
      .withSource(this.actionName)
      .addRule(new rules.AreEqual('ThingsAreEqual', 'The things are not equal.', 'this', 'that', false))
      .addRule(new rules.IsTrue('ThisIsTrue', 'This is not true', this.isDone, true))
      .addRule(new rules.IsTrue('Really?', 'Is it really true?', false))
      .addRule(new rules.StringIsNotNullEmptyRange('StringIsGood', 'The string is not valid.', 'Hi', 3, 10));
```

Here is an example of a business action (unit of work) for adding a `contact`. It uses the `ValidationContext` to add a set of specific rules to validate the action. If all of the rules evaluate without any errors, the API is called with the contact DTO object.

> Focus on the `preValidateAction()` method. This is where the rules are implemented for adding a new contact to the application.

```ts
import { BusinessActionBase } from './business-action-base';
import { StringIsNotNullEmptyRange, IsNotNullOrUndefined } from '@buildmotion/rules-engine';
import { Severity } from '@buildmotion/logging';
// tslint:disable-next-line:nx-enforce-module-boundaries
import { ContactDto, EmailAddressFormatIsValidRule } from '@buildmotion/quicken/domain/common';

/**
 * Use this action to perform business logic with validation and business rules.
 */
export class AddContactAction<T> extends BusinessActionBase<T> {
  constructor(private contact: ContactDto) {
    super('AddContactAction');
  }

  /**
   * Use the [preValidateAction] to add any business or validation rules that
   * are required to pass in order to perform the action.
   *
   * Use the [ValidationContext] item of the action to add rules. The ValidationContext
   * uses a Fluent API to allow for chained rules to be configured.
   */
  preValidateAction() {
    this.validationContext.addRule(
      new IsNotNullOrUndefined('ContactDtoIsValid', 'The contact information is not valid.', this.contact, this.showRuleMessages)
    );

    if (this.contact) {
      this.validationContext
        .addRule(
          new StringIsNotNullEmptyRange(
            'Address1IsValid',
            'The address information 1 is required. Cannot be greater than 60 characters.',
            this.contact.address1,
            3,
            60,
            this.showRuleMessages
          )
        )
        .addRule(
          new StringIsNotNullEmptyRange(
            'Address2IsValid',
            'The address 2 information is required. Cannot be greater than 60 characters.',
            this.contact.address2,
            0,
            60,
            this.showRuleMessages
          )
        )
        .addRule(
          new StringIsNotNullEmptyRange(
            'CityIsValid',
            'The city is required. Cannot be greater than 60 characters.',
            this.contact.city,
            1,
            60,
            this.showRuleMessages
          )
        )
        .addRule(
          new StringIsNotNullEmptyRange(
            'CompanyIsValid',
            'The company is required. Cannot be greater than 60 characters.',
            this.contact.company,
            1,
            60,
            this.showRuleMessages
          )
        )
        .addRule(
          new StringIsNotNullEmptyRange(
            'EmailAddressIsValid',
            'The email is required. Cannot be greater than 80 characters.',
            this.contact.emailAddress,
            5,
            80,
            this.showRuleMessages
          )
        )
        .addRule(
          new EmailAddressFormatIsValidRule(
            'EmailAddressFormatIsValid',
            'The email address format is not valid.',
            this.contact.emailAddress,
            this.showRuleMessages
          )
        )
        .addRule(
          new StringIsNotNullEmptyRange(
            'FirstNameIsValid',
            'The first name value is required. Cannot be greater than 45 characters.',
            this.contact.firstName,
            1,
            45,
            this.showRuleMessages
          )
        )
        .addRule(
          new StringIsNotNullEmptyRange(
            'LastNameIsValid',
            'The last name value is required. Cannot be greater than 45 characters.',
            this.contact.lastName,
            1,
            45,
            this.showRuleMessages
          )
        )
        .addRule(
          new StringIsNotNullEmptyRange(
            'PhoneIsValid',
            'The phone value is required. Cannot be greater than 25 characters.',
            this.contact.phone,
            10,
            25,
            this.showRuleMessages
          )
        )
        .addRule(
          new StringIsNotNullEmptyRange(
            'PostalCodeIsValid',
            'The postal code value is required. Cannot be greater than 25 characters.',
            this.contact.postalCode,
            5,
            25,
            this.showRuleMessages
          )
        )
        .addRule(
          new StringIsNotNullEmptyRange(
            'StateIsValid',
            'The state value is required. Cannot be greater than 45 characters.',
            this.contact.state,
            2,
            45,
            this.showRuleMessages
          )
        );
    }
  }

  /**
   * Use the [performAction] operation to execute the target of the action's business logic. This
   * will only run if the rules and validations are successful.
   */
  performAction() {
    this.loggingService.log(this.actionName, Severity.Information, `Preparing to call API to complete action.`);
    this.response = this.businessProvider.apiService.addContact<T>(this.contact);
  }
}
```

### Custom Rules

Notice that the rules for adding a new `Contact` contains an `EmailAddressFormatIsValidRule` rule. 

> Custom rules inherit from either a `CompositeRule` or a `SimpleRule`. All rules inherit from the `RulePolicy` class and are executed and evaluated the same way. A [`RuleResult`](#ruleresult) is returned when a simple or composite rule is evaluated.

```ts
import { CompositeRule, StringIsNotNullEmptyRange, StringIsRegExMatch } from '@buildmotion/rules-engine';
import { RuleConstants } from './rule-constants';

/**
 * Use to validate the format of an email address. Expects:
 *
 * 1. string is not null or undefined
 * 2. string length is within specified value
 * 3. string value matches RegEx
 *
 *
 * Resource: https://emailregex.com/
 */
export class EmailAddressFormatIsValidRule extends CompositeRule {
  constructor(name: string, message: string, private emailAddress: string, isDisplayable: boolean = true) {
    super(name, message, isDisplayable);
    this.configureRules();
  }

  configureRules() {
    this.rules.push(
      new StringIsNotNullEmptyRange(
        'EmailAddressStringIsValid',
        'The email address value is not valid. Must be within 5 and 100 characters.',
        this.emailAddress,
        5,
        100,
        true
      )
    );

    this.rules.push(
      new StringIsRegExMatch(
        'EmailAddressContainsValidCharacters',
        'The email address format is not valid.',
        this.emailAddress,
        RuleConstants.emailAddressFormatRegEx,
        true
      )
    );
  }
}
```

### Rules with Rules (Composite)

> A *composite* rule is a collection of simple and composite rules.

Notice that this composite rule contains another composite rule: `StringIsRegExMatch`. Rules can be an Object-Graph of rules - a rule chain. Where each rule or group of rules (Composite) must evaluate without any errors for the rule or context to be valid. If any rule fails within the ValidationContext the `ValidationContextState.State` is `Failure`.

```ts
import { CompositeRule } from './CompositeRule';
import { IsNotNullOrUndefined } from './IsNotNullOrUndefined';
import { IsTrue } from './IsTrue';

/**
 * Use this rule to determine if the string value matches the specified
 * regular expression.
 */
export class StringIsRegExMatch extends CompositeRule {
  /**
   * The constructor for the [IsNotNullOrUndefined] rule.
   * @param name The name of the rule.
   * @param message The message to display when the rule is violated.
   * @param target The target that the rules are evaluated against.
   * @param isDisplayable: Indicates if the rule violation is displayable. Default value is [false].
   */
  constructor(name: string, message: string, private target: string, private expression: RegExp, isDisplayable: boolean) {
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
    this.rules.push(
      new IsNotNullOrUndefined('StringIsNotNullOrUndefined', 'The target value is null or undefined.', this.target, doNotShowRuleViolation)
    );
    if (this.target) {
      this.rules.push(
        new IsTrue('StringIsRegExpMatch', 'The target value is not a match.', this.expression.test(this.target), doNotShowRuleViolation)
      );
    }
  }
}
```

## Executing Rules
When you have added one or more rules to an instance of a `ValidationContext`, you are ready to execute the rules. The 
`renderRules()` method will return the `ValidationContext` - each of the rules are evaluated against their specified 
targets. You are now ready to evaluate the rule results. 

```ts
this.validationContext.renderRules();
```

## Evaluation Rule Results
After the rules are executed, you can examine the rule results. Each rendered rule will have a result - either valid or not valid, 
based on the rule, criteria, and target value(s). 

Many times it is useful to filter or extract the failed rules from the `ValidationContext`. The following code snippet shows how 
you would extract failed rules that are marked as displayable (i.e., `e.rulePolicy.isDisplayable`) into a list of `ServiceMessage` items.

```ts
// Load the error/rule violations into the ServiceContext so that the information bubbles up to the caller of the service;
this.validationContext.results.forEach( (e) => {
    if(!e.isValid && e.rulePolicy.isDisplayable) {
        let serviceMessage = new ServiceMessage(e.rulePolicy.name, e.rulePolicy.message, MessageType.Error);
        this.serviceContext.addMessage(serviceMessage);
    }
} );
```

## RulePolicy

The `RulePolicy` is the base class for all rule types. The angular-rules-engine contains (2) types of rule implementations:
1. Simple
2. Composite. 

These rule types form the basis of all rules in the rule engine. The rule engine uses the Composite Design Pattern - [click here for more information about this pattern](https://en.wikipedia.org/wiki/Composite_pattern). All rules have the following properties of information. 

+ **isValid**: Use to indicate the status of the rule after evaluation.
+ **message**: Use to provide a message for failed rules. 
+ **name**: Use to create a name that identifies the specified rule.
+ **priority**: Use to assign a numeric value to the rule. Rules are sorted by priority and executed in the same sort sequence. 
+ **result**: The output of an executed rule. It contains the result and `RulePolicy` information.
+ **isDisplayable**: Use to indicate if the rule result is displayable to the caller. Default value is `false`. You must explicitly provide a [true] value for this when initializing a new rule. 
+ **renderType**: Currently the only option is `RenderType.EvaluateAllRules`. 
+ **severity**: Use to indicate the severity (Exception, Warning, or Information) if the rule evaluation is not valid.
+ **source**: Use to indicate the source or location of the rule.

The following `RulePolicy` class is the base class for all rules. Each of the default rules also extend either the `SimpleRule` or the `CompositeRule`. And each of these classes extend from the `RulePolicy` class. The allows *all* rules to have common behavior and execution strategies.


```ts
export class RulePolicy implements IRuleComponent {
    isValid: boolean = true;
    message: string;
    name: string;
    priority: number;
    result: RuleResult;
    isDisplayable: boolean;
    renderType: RenderType = RenderType.EvaluateAllRules;
    severity: Severity = Severity.Exception;
    source: string;

    constructor(name: string, message: string, isDisplayable: boolean);
    constructor(name: string, message: string, isDisplayable: boolean = false, severity: Severity = Severity.Exception, priority: number = 0) {
        this.name = name;
        this.message = message;
        this.isDisplayable = isDisplayable;
        this.priority = priority;
        this.severity = severity;
    }

    execute(): RuleResult {
        console.log('Begin execution of RulePolicy: ' + this.name);
        return this.render();
    }

    /**
     * Each rule must implement this function and return a valid [RuleResult].
     */
    render(): RuleResult {
        throw new Error('Each concrete rule must implement this function and return a valid Result.');
    }
}
```
## IRuleComponent

This interface is just infrastructure for the rule engine. It provides the contract that all rules will contain an `execute()` method - this provides a consistent mechanism to begin the process of all rules that implement this interface. 

```ts
export interface IRuleComponent {
    execute(): RuleResult;
}
```
## RuleResult
The output of an executed rule is a `RuleResult` object that contains the rule (`rulePolicy`), an indicator for the rule's state (`isValid`), and a message to be used if the rule has failed. 

```ts
import {RulePolicy} from './index';
import {CompositeRule} from './index';

export class RuleResult {
    isValid: boolean = false;
    rulePolicy: RulePolicy;
    message: string;
    target: any;

    constructor(rulePolicy: RulePolicy, target: any);
    constructor(rulePolicy: CompositeRule);
    constructor(rulePolicy: RulePolicy, target?: any) {
        if (rulePolicy != null) {
            this.rulePolicy = rulePolicy;
            this.isValid = rulePolicy.isValid;
            this.message = rulePolicy.message;
        }
        this.target = target;
    }
}
```

## Simple Rules
The main difference between `SimpleRule` and a `CompositeRule` is how they are rendered during their execution. A simple rule has a single evaluation with a single result.

```ts
import {RulePolicy} from './RulePolicy';

/**
 * Use this class as a base [extends] class for simple rules. A simple contains
 * a single rule and target to evaluate.
 *
 * If you require a rule that will contain more than one rule, you should
 * use extend the [CompositeRule] class.
 */
export class SimpleRule extends RulePolicy {

    /**
     * The constructor for the simple rule.
     * @param name: The name of the rule.
     * @param message: The message to display if the rule is violated.
     */
    constructor(name: string, message: string, isDisplayable: boolean) {
        super(name, message, isDisplayable);
    }
}
```

The following code is the `IsTrue` rule. This rule evaluates the target and creates a new
`RuleResult` in the `render()` method. Basically, the result is based on the evaluation of the target value. This `render()` method returns a single result. This is much different from a composite rule discussed later that has to return a `RuleResult` for each rule in a list of rules. 

```ts
export class IsTrue extends SimpleRule {
    target: boolean;

    constructor(name: string, message: string, target: boolean, isDisplayable: boolean = true) {
        super(name, message, isDisplayable);
        this.target = target;
    }

    render() {
        this.isValid = true;
        if (this.target === false) {//if(not true)-->false;
            this.isValid = false;
        }
        return new RuleResult(this, this.target);
    }
}
```

## Composite Rules
A composite rule is a rule that contains a list of rules to be evaluated. A rule in this list can be a rule that extends from either `SimpleRule ` or `CompositeRule`. This allows for a more complex implementation of rules - it is a very powerful pattern. You can have a rule that contains a list of rules, where one of those rules may be a `CompositeRule`, where one of those rules in the composite rule is a composite side-by-side with other simple and complex rules. 

You are creating a rule-tree where all rules will have to evaluate to valid for the container rule to be valid. This pattern allows a developer to create new custom rules and then use those rules with the default rules to orchestrate a rule implementation against a target object or value. 

The `CompositeRule` extends from `RulePolicy` which has the responsible of calling `render()` on each rule. In case of a composite rule, this method will iterate through the list of rules and call the the `execute()` method of each rule. Then the results are processed to determine if *any* of the rules failed. 

```ts
import {RulePolicy} from './RulePolicy';
import {RuleResult} from './RuleResult';

export class CompositeRule extends RulePolicy {
    hasErrors: boolean = false;
    results: Array<RuleResult> = new Array<RuleResult>();
    rules: Array<RulePolicy> = new Array<RulePolicy>();

    constructor(name: string, message: string, isDisplayable: boolean) {
        super(name, message, isDisplayable);
    }

    render(): RuleResult {
        this.rules.sort(s => s.priority).forEach(r => this.results.push(r.execute()));
        return this.processResults();
    }

    public hasRules(): boolean {
        if (this.rules && this.rules.length > 0) {
            return true;
        }
        return false;
    }

    processResults(): RuleResult {
        if (this.results.filter(r => (r.isValid === false)).length > 0) {
            this.isValid = false;
            this.hasErrors = true;
        }
        return new RuleResult(this);
    }
}
```

The following shows an implementation of a composite rule. Basically, this rule is using (2) default rules, both of which are also
composite rules. All rules within each composite must evaluate to true for this rule to be valid. 

```ts
import dCompareResult = require('typescript-dotnet-commonjs/System/CompareResult');
import CompareResult = dCompareResult.CompareResult;
import dCompare = require('typescript-dotnet-commonjs/System/Compare');
import Compare = dCompare;

import {CompositeRule} from './index';
import {RuleResult} from './RuleResult';
import {Primitive} from './index';
import {IsNotNullOrUndefined} from './index';
import {Range} from './index';

/**
 * Use this rule to validate a string target. A valid string is not null or undefined; and it
 * is within the specified minimum and maximum length. 
 */
export class StringIsNotNullEmptyRange extends CompositeRule {
    maxLength: number;
    minLength: number;
    target: Primitive;

    /**
     * The constructor for the [StringIsNotNullEmptyRangeRule].
     * @param name: The name of the rule.
     * @param message: The message to display when the rule is violated.
     * @param target: The target that the rule(s) will be evaluated against.
     * @param minLength: The minimum allowed length of the target value.
     * @param maxLength: The maximum allowed length of the target value.
     */
    constructor(name: string, message: string, target: Primitive, minLength: number, maxLength: number, isDisplayable: boolean = false) {
        super(name, message, isDisplayable);
        this.target = target;
        this.minLength = minLength;
        this.maxLength = maxLength;

        this.configureRules();
    }

    /**
     * A helper method to configure/add rules to the validation context. 
     */
    configureRules() {
        this.rules.push(new IsNotNullOrUndefined('StringIsNotNull', 'The string target is null or undefined.', this.target));
        if (this.target != null) {
            this.rules.push(new Range('TargetLengthIsWithinRange', 'The string value is not within the specified range.', this.target.toString().length, this.minLength, this.maxLength));
        }
    }
}
```

The `Range` rule used in the composite rule above uses (2) simple rules to form the composite. Each rule has to evaluate to true for the entire rule to be valid. 

```ts
import dCompareResult = require('typescript-dotnet-commonjs/System/CompareResult');
import CompareResult = dCompareResult.CompareResult;
import dCompare = require('typescript-dotnet-commonjs/System/Compare');
import Compare = dCompare;

import {CompositeRule} from './index';
import {RuleResult} from './RuleResult';
import {Primitive} from './index';
import {IsNotNullOrUndefined} from './index';
import {Min} from './index';
import {Max} from './index';

/**
 * Use this rule to determine if the specified target is within the specified range (start and end) values.
 *
 * The range values are inclusive.
 *
 * Ex: 1 is within 1 and 3. The target is valid.
 * Ex: 2 is within 1 and 3. The target is valid.
 * Ex: 0 is not within 1 and 3. The target is not valid.
 * Ex: 4 is not within 1 and 3. The target is not valid.
 */
export class Range extends CompositeRule {
    end: number;
    start: number;
    target: Primitive;

    /**
     * Constructor for the [Range] rule. 
     * @param name: The name of the rule.
     * @param message: A message to display if the rule is violated.
     * @param target: The target object that the rules will be applied to.
     * @param start: The start range value - the lowest allowed boundary value.
     * @param end: The end range value - the highest allowed boundary value.
     * @param isDisplayable: Indicates if the rule violation may be displayed or visible to the caller or client.
     */
    constructor(name: string, message: string, target: Primitive, start: number, end: number, isDisplayable: boolean = false) {
        super(name, message, isDisplayable);
        this.target = target;
        this.start = start;
        this.end = end;
        this.isDisplayable = isDisplayable;

        this.rules.push(new IsNotNullOrUndefined('TargetIsNotNull', 'The target is null or undefined.', this.target));

        if (this.target != null) {
            this.rules.push(new Min('MinValue', 'The value must be equal to or greater than the start range value.', this.target, this.start));
            this.rules.push(new Max('MaxValue', 'The value must be equal to or less than the end range value.', this.target, this.end));
        }
    }
}
```

## Conclusion
There are lots of details in the implementation of a rule engine. However, remember that you only need to initialize a `ValidationContext`, add rules, and then call the `renderRules()` to evaluate the rule set and provide a list of `RuleResult` items. It is that simple. Happy rule rendering.

&copy; 2016-2021, Build Motion, LLC [www.AngularArchitecture.com](https://www.AngularArchitecture.com)

## Resources

- [The Composite Pattern - Design Patterns Meet the Frontend](https://dev.to/coly010/the-composite-pattern-design-patterns-meet-the-frontend-445e)
- [Composite Pattern (Wikipedia)](https://en.wikipedia.org/wiki/Composite_pattern)
- [Composite Pattern using C#](https://www.dofactory.com/net/composite-design-pattern)
