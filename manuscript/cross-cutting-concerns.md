{sample: false} 
# Cross-Cutting Concerns
 
> Angular Architecture: A book on applying enterprise patterns and practices in Angular. This sample chapter talks about cross-cutting conerns: 
> 
> 1. what they are
> 2. benefits
> 3. how to implement your own
> 4. how to provide configuration to cross-cutting concern
>
> See the book on [Leanpub.com - Angular Architecture by Matt Vaughn](https://leanpub.com/angular-architecture-the-unofficial-guide)
 
What is a cross-cutting concern? It is a concern that crosses the boundaries of your application layers and domain verticals. They are typically agnostic to domain features of the application. They provide useful features to applications like configuration, logging, and error handling. Most applications have requirements to log application events, handle errors and log those errors to a centralized repository. This allows administrators to monitor the health of the application.
 
A typical cross-cutting concern is something that is not specific to the domain of your application. For example, if you are building a learning management system that include features for authors, students, courses, and videos - it would be something so generic, yet functional, that is used within all or quite a few domain features.
 
For example, instead of implementing _logging_ directly within an application, we can abstract and separate the cross-cutting concern from the application. I recommend implementing these as library projects. This allows other applications and libraries within an Angular Workspace to use the specified cross-cutting concern library.
 
Cross-cutting concerns are like many of the infrastructure items that are often not thought about, discussed, or included in the early architectural decisions. Let's say your company has spent 2 or more years of development on a specific project - the current project doesn't have any centralized error handling or logging of information, events, or even errors. How can you quantify that the application is working properly? How will you know if there is a problem with the latest build or deployment? This may seem like an extreme example. However, as a consultant I have seen this very scenario more than once.
 
It is easier to determine _what_ cross-cutting concerns the application requires early and most likely before a single line of domain feature code is written. I like to think of cross-cutting concerns as _required_ infrastructure concerns that provide value during the development, maintenance, and runtime of the application.
 
These concerns are like the electrical, plumbing, and air systems that are part of a home. Each room of a house has a specific concern and set of features - however, most likely each of the rooms require one if not all of the infrastructure elements listed above. If someone built a new home and these cross-cutting concerns were not addressed before construction, where and how would they be put in retroactively? The home would be an odd mess. We normally follow convention in many parts of our lives, in building homes and other things. Do not let the excitement of building out the features of a new application outweigh the importance of having a good foundation for your application which includes cross-cutting concerns.
 
> ***Pro Tip***: The minimal cross-cutting concerns for an _enterprise_ Angular application are logging and error handling. I cannot stress the value and importance of these (2) concerns. If there are any issues in your code, you know early if you log and handle errors.
 
## Identify Candidates for Reuse
 
A good rule to follow when developing applications, is to identify candidates to share with multiple applications or libraries. Implement these candidates as stand-alone library projects. The Angular Workspace with library projects gives us the ability to share and reuse code effectively. Consider it _thoughtful development_ when you think through the solutions with this level of detail.
 
Putting reusable code in their own libraries is a great organizational strategy. It provides a single source of truth for the specific feature. If the feature needs an enhancement or improvement due to a defect, then you have one place to make that change and then all of the other applications or libraries benefit. This eliminates the need to go to many different applications or many different areas within an application to fix something that should have been implemented as a reusable library.
 
> ***Pro Tip***: Some or just enough analysis, design, and planning can make a difference of success or failure. Look back at some failed projects or features to determine if a little more preparation could have made a difference.
 
It is interesting to think that setting up a new development environment could have so much code and features without a single line of the domain application code. I have found over the years that most applications, if not all of them, require these very common cross-cutting concerns. Therefore, implementing them as reusable libraries makes a lot of sense. It is more efficient and effective in terms of managing your code, improving the code, and allowing other applications and libraries to share the code.
 
Creating reusable libraries in the Angular Workspace is a relatively new topic. The Angular Workspace is now a capability since version 6 of Angular. If you or your team are not taking advantage of the Angular Workspace by creating reusable libraries, then you are missing out on one of the biggest game changers in Angular and web development. These are new capabilities that many web development teams have not had the luxury. Using cross-cutting concern libraries simplifies the implementation of your domain code. The code is much cleaner, the signatures of constructors and methods are specific to the domain and do not include any cross-cutting concern items.
 
> Separate early and often. Do not implement things that should be shared directly in an application project.
 
I take advantage of a configuration library that provides or pushes configuration to each of the cross-cutting concerns during runtime. Many of these cross-cutting concern libraries contain services that can be injected into your application (i.e., services or components). Thus, we get the ability to use dependency injection and to have the ability to use these cross-cutting concerns very easily throughout our Angular application projects.
 
The reason why I bring up these cross-cutting concerns when we are talking about implementing a feature module, is that every feature module requires these things. Therefore, it is very important that the architect or team lead take the time to define the patterns (recipes) for implementing cross-cutting concerns in feature modules. The architect determines and demonstrates how each feature module service or component logs information, how they handle errors, and how they provide information back to the user. The team lead or architect is also responsible for establishing the different layers of the application within a feature module. They define how each layer communicates with other layers within the feature module.
 
It may seem odd to a teammate to see so much defined up front. Some team members may not understand why everything needs to be defined up front before developing the feature module. However, if the patterns, practices, and recipes to create each of the feature module elements are well defined, there is more consistency in the implementation. Therefore the code is more consistent and maintainable throughout the lifetime of the application. I have seen entire code bases for large applications to have such consistency; that you cannot tell which team member implemented what part of the code.
 
> Remember that any application that is deployed to production is an application that requires maintenance.
 
I have heard some developers say that with so much structure, planning, and design - that it inhibits innovation and creativity. This is _not_ true. To truly innovate and be creative a person needs a full-understanding and knowledge of how something works, not a superficial knowledge. This type of understanding also requires experience over time or at least a strong analysis of the domain. With this level of understanding and knowledge a developer can truly be creative and innovative. Without it, it is just guess work with getting lucky _occasionally_. Do not confuse the occasional success as full understanding and knowledge of how something works if you didn't do a good-enough analysis of the domain item.
 
> It is not sufficient to know how to write code and compile it. You need to understand the domain of the application along with its concerns, why it is important and beneficial, who uses it, the business rules and workflow. This takes discipline and commitment.
 
Putting thought, design and a plan in place early allows for easier maintenance and extensibility later. For example I propose that services and components should all extend from a base class. This base class provides the structure and opportunity to provide common elements, features, methods and properties that all components or services can share. It is an excellent extensibility point.
 
## Logging
 
Before we write any domain code for the feature we might want to think about how are we going to handle logging or writing information about events that happen in the application. It is important for the developers of the application to know when and where and also in what sequence things take place when business logic is executed. Therefore our application requires a logging service so that we can persist this information.
 
The simplest way to do this in Angular is to create a _service_ that can be injected into our components and services. This service at the minimum logs information to the console of the application browser or Visual Studio Code environment. This allows you to see information about events, errors, and details about the application during development.
 
Use the following CLI command to create a new library project within your Angular Workspace. This allows other projects to use the features of the logging module/service.
 
```ts
ng g library logging --publishable
```
 
### LoggingService
 
The following _LoggingService_ is a typical implementation that I use to provide the capture of log events for an application. It only does a few things.
 
- retrieves configuration for logging from the _configuration service_
- uses a _logEntries\$_ Observable to publish log events
- the _log()_ method is used by consumers of the _LoggingService_ to add a new log event
 
> Note: the logging service requires some configuration. Please see the [Configuration](#configuration) section for more information on how to provide configuration to cross-cutting concern modules and services.
 
```ts
import { Injectable, Optional } from "@angular/core";
 
import { Severity } from "./severity.enum";
import { IConfiguration } from "@angularlicious/configuration";
import { ConfigurationService } from "@angularlicious/configuration";
import { LogEntry } from "./log-entry";
import { ReplaySubject, Observable } from "rxjs";
import { ILogEntry } from "./i-log-entry";
import { LoggingConfig } from "@angularlicious/configuration";
import { Guid } from "guid-typescript";
import { take } from "rxjs/operators";
 
@Injectable()
export class LoggingService {
  serviceName = "LoggingService";
  source: string;
  severity: Severity;
  message: string;
  timestamp: Date = new Date();
  applicationName: string;
  version: string;
  isProduction: boolean;
  config: LoggingConfig;
  id: Guid = Guid.create();
 
  private logEntriesSubject: ReplaySubject<ILogEntry> = new ReplaySubject<
    ILogEntry
  >(1);
  logEntries$: Observable<ILogEntry> = this.logEntriesSubject.asObservable();
 
  /**
   * The [LoggingService] constructor.
   */
  constructor(@Optional() public configService: ConfigurationService) {
    this.log(
      this.serviceName,
      Severity.Information,
      `Starting logging service [${this.id.toString()}] at: ${this.timestamp}`
    );
    this.initializeService(configService);
  }
 
  /**
   * Use to initialize the logging service. Retrieves
   * application configuration settings.
   *
   * @param configService contains the configuration settings for the application
   */
  private initializeService(configService: ConfigurationService) {
    if (configService) {
      this.configService.settings$
        .pipe(take(1))
        .subscribe(settings => this.handleSettings(settings));
    }
  }
 
  /**
   * Use to handle settings from the configuration service.
   * @param settings
   */
  handleSettings(settings: IConfiguration) {
    if (settings) {
      this.config = settings.loggingConfig;
 
      this.applicationName =
        this.config && this.config.applicationName
          ? this.config.applicationName
          : "Angular";
      this.version =
        this.config && this.config.version ? this.config.version : "0.0.0";
      this.isProduction =
        this.config && this.config.isProduction
          ? this.config.isProduction
          : false;
    }
  }
 
  /**
   * Use this method to send a log message with severity and source information
   * to the application's logger.
   *
   * If the application environment mode is [Production], the information will
   * be sent to a centralized repository.
   *
   * @param source
   * @param severity
   * @param message
   */
  log(source: string, severity: Severity, message: string, tags?: string[]) {
    this.source = `${this.applicationName}.${source}`;
    this.severity = severity;
    this.message = message;
    this.timestamp = new Date(Date.now());
 
    if (tags) {
      tags.push(`LoggerId:${this.id.toString()}`);
    } else {
      tags = [`LoggerId:${this.id.toString()}`];
    }
 
    const logEntry = new LogEntry(
      this.applicationName,
      this.source,
      this.severity,
      this.message,
      tags
    );
    this.logEntriesSubject.next(logEntry);
  }
}
```
 
### Log Entry Items
 
Notice that there is no code in the _LoggingService_ to actually log or write an event to a repository or to the application console. The logging service publishes log entries using an _Observable_. This allows a separation of concerns to capture log entries and the actual mechanism to write them. How and where to write a log entry is up to you. All we need is a log _writer_ that is responsible for logging events to a console or a Web API. This log writer subscribes to the _logEntries\$_ Observable and then write new log events from the data stream of new log items. The application creates log items and the LoggingService just publishes them.
 
Here is the _ILogEntry_ interface that provides the definition of a log entry.
 
```ts
import { Severity } from "./severity.enum";
 
export interface ILogEntry {
  source: string;
  application: string;
  severity: Severity;
  message: string;
  timestamp: Date;
  tags?: string[];
}
```
 
When you create a new log entry, you can define the _Severity_ level of the log item. The _Severity_ allows you to designate the level of the log entry. During development, you may want to be verbose in your logging and log all entries. You might have a different strategy for production deployments. For example, you may only want to log entries that are _Warning_ or _Error_ designation only. You can add logic to your writers that log information based on the environment and the severity level of the log entry.
 
I'll use the `Severity.Information` enum option to define log entries throughout the application to see a sequence of events and operations. I rely on these to show and display information relevant to the specific operation and feature. Here is an example of an _informational_ log entry.
 
```ts
this.loggingService.log(
  this.componentName,
  Severity.Information,
  `Preparing to load the provider(s) for authentication.`
);
```
 
Here is a sample _Severity_ enum that includes some options that may be useful for your implementation.
 
```ts
export enum Severity {
  Information = 1,
  Warning = 2,
  Error = 3,
  Critical = 4,
  Debug = 5
}
```
 
### Log Entry Writer
 
So far, we've created a logging service that captures log events from an application. However, these log entries are not very useful unless we can view and monitor the log events. We can create a helper for this cross-cutting concern to actual write the log entries. Now we have to determine the destination of the log entries.
 
The easiest destination is the application console. Use the CLI to create a _ConsoleWriter_ service in the Logging library project. Below is an example of a console writer. This implementation is a little unique. Notice that the service extends a _LogWriter_ class. This _LogWriter_ is a [TypeScript _abstract_ class](https://www.typescriptlang.org/docs/handbook/classes.html#abstract-classes) that provides the structure and implementation details to implement any number of log _writers_ for the application.
 
Remember that a _log writer_ only needs to subscribe to the _LoggingService_ and then handle any published log entry events. The writer is a service that is decorated with _@Injectable_ which allows it to be provided to the application when it initializes, just like any other provider. Therefore, you have some control as to what log _writers_ you want to provide for the application.
 
- The log writer has a _LoggingService_ injected into the constructor.
- Subscribes to the _logEntries\$_ Observable
- handles published log events
- _writes_ the log item to the specified target (console)
 
```ts
import { LogWriter } from "./log-writer";
import { ILogEntry } from "../i-log-entry";
import { Severity } from "../severity.enum";
import { Injectable } from "@angular/core";
import { LoggingService } from "./../logging.service";
 
/**
 * Use this writer to log information to the browser console.
 */
@Injectable()
export class ConsoleWriter extends LogWriter {
  constructor(private loggingService: LoggingService) {
    super();
    this.loggingService.logEntries$.subscribe(logEntry =>
      this.handleLogEntry(logEntry)
    );
  }
 
  handleLogEntry(logEntry: ILogEntry) {
    this.targetEntry = logEntry;
    this.execute();
  }
 
  /**
   * No setup required for the console writer.
   */
  public setup(): void {}
 
  /**
   * Implementation of the abstract method. This will perform the
   * actual `write` action for the specified writer.
   */
  public write(): void {
    switch (this.targetEntry.severity) {
      case Severity.Debug:
        console.debug(this.targetEntry);
        break;
      case Severity.Information:
        console.info(this.targetEntry);
        break;
      case Severity.Warning:
        console.warn(this.targetEntry);
        break;
      case Severity.Error:
        console.error(this.targetEntry);
        break;
      case Severity.Critical:
        console.error(this.targetEntry);
        break;
      default:
        break;
    }
  }
}
```
 
### Log Writer Abstract Class
 
The _LogWriter_ is an abstract class. This means that class cannot be instantiated directly - but it can provide the overall structure for any class to become a log writer. Only classes that _extend_ this abstract class can be initialized. Abstract classes are unique in that they can define a set of abstract members (e.g., methods, properties) that require _implementation_ from classes that extend from them. They can also provide implementation members - these members are consumed and available by classes that extend the abstract class. So they provide abstract members like an interface but have the capability to provide implementations for any public members.
 
Abstract classes are useful to provide common behaviors and a structure for any sub-classes that extend from it. It is like a super base class that is extensible. They are like a miniature blue-print for a specialized class. Abstract classes are not part of the JavaScript specification - they are built into TypeScript and support many Object-Oriented design principles.
 
> **Pro Tip**: Use _abstract_ classes and the [_template method_](https://en.wikipedia.org/wiki/Template_method_pattern) design pattern. It is a powerful pattern to provide a consistent implementation for performing the same operation but using a distinct implementation. Can you think of anything in Angular that uses this pattern? Wait for it...the Angular _Component_ has a life-cycle of events and methods - same pattern.
 
The template method abstract class implements the _ILogWriter_ interface which has an `execute()` method that requires implementation. You can name your entry point method anything you want - the important thing is that it provides a wrapper around the set of template methods.
 
```ts
import { ILogEntry } from "../i-log-entry";
 
export interface ILogWriter {
  execute(): void;
}
```
 
The `execute()` method is the entry point into the template method pattern for our writers. We have an entry method that is a controller for a set of methods that define the _template_ or recipe. The recipe in this example is set of methods that provide the implementation of writing log entries. Here is the list or our methods that work together to provide this log writing capability.
 
- setup()
- validateEntry()
- write()
- finish()
 
The following is the actual _template method_ that demonstrates the flow of the template methods. Some call this the pipeline or lifecycle of something. It is interesting to note that when you use the RxJS `pipe()` method, you are creating a pipeline of methods that run in a specified sequence when you add any of the RxJS operator methods within the pipe.
 
```ts
  execute(): void {
    this.setup();
    if (this.validateEntry()) {
      this.write();
    }
    this.finish();
  }
```
 
The _LogWriter_ class below provides default implementation for any classes that extend from it. The template method pattern is very extensible. You can add more methods to the template and provide a default implementation and then all other classes that extend from this abstract class now have that behavior.
 
The `validateEntry()` method provides a default validation of the information required to log an entry whether it is to the console or to a Web API. If there are no rule violations, the writer invokes the specific writer's `write()` method. In our current code example, it writes the entry to the application's console.
 
> Note: I use another cross-cutting concern that provides the ability to use default and/or create custom rules for validation. I can reuse the _rules-engine_ in services, components, business logic layers - anywhere there is a need to validate things in a consistent and reliable manner.
 
```ts
import { ILogWriter } from "./i-log-writer";
import {
  ValidationContext,
  IsTrue,
  IsNotNullOrUndefined,
  StringIsNotNullEmptyRange
} from "@angularlicious/rules-engine";
import { ILogEntry } from "../i-log-entry";
 
// @Injectable()
export abstract class LogWriter implements ILogWriter {
  hasWriter: boolean; // = false;
  targetEntry: ILogEntry;
 
  /**
   * Use this method to execute the write process for the
   * specified [Log Entry] item.
   *
   * Using the [template method] design pattern.
   */
  execute(): void {
    this.setup();
    if (this.validateEntry()) {
      this.write();
    }
    this.finish();
  }
 
  /**
   * Use to perform an setup or configuration of the [writer].
   * The [setup] method runs on all executions of the writer - and
   * is called before the [write] method.
   */
  public abstract setup(): void;
 
  /**
   * Use to validate the [log entry] before attempting to write
   * using the specified [log writer].
   *
   * Returns a [false] boolean to indicate the item is not valid.
   */
  public validateEntry(): boolean {
    const validationContext = new ValidationContext();
    validationContext.addRule(
      new IsTrue(
        "LogWriterExists",
        "The log writer is not configured.",
        this.hasWriter
      )
    );
    validationContext.addRule(
      new IsNotNullOrUndefined(
        "EntryIsNotNull",
        "The entry cannot be null.",
        this.targetEntry
      )
    );
    validationContext.addRule(
      new StringIsNotNullEmptyRange(
        "SourceIsRequired",
        "The entry source is not valid.",
        this.targetEntry.source,
        1,
        100
      )
    );
    validationContext.addRule(
      new StringIsNotNullEmptyRange(
        "MessageIsValid",
        "The message is required for the [Log Entry].",
        this.targetEntry.message,
        1,
        2000
      )
    );
    validationContext.addRule(
      new IsNotNullOrUndefined(
        "TimestampIsRequired",
        "The timestamp must be a valid DateTime value.",
        this.targetEntry.timestamp
      )
    );
 
    return validationContext.renderRules().isValid;
  }
 
  /**
   * Use to implement the actual write of the [Log Entry].
   */
  public abstract write(): void;
 
  /**
   * Use to finish the process or clean-up any resources.
   */
  public finish(): void {}
}
```
 
### Centralized Log Repository
 
Now that we have a LoggingService and a recipe for creating log _writers_ we can add different writers that target a different destination (i.e., Web API/database). This is where logging get interesting. When a single page application is released into production, the application runs on a web browser: the client. Any activity or events that you want to log need to be stored in a centralized repository or location. We do not have access to the browser console anymore.
 
Adding log events to the browser's console does not provide any insight into what the application is doing or its current health. Therefore, we need (2) things:
 
1. a centralized repository to store and persist log information
2. a way to view log items - which may include searching and filtering
 
There are several cloud-based solutions that allow you to store application log information and to use their reporting tools to view the log events. I use [Loggly](https://www.loggly.com). Usually, the cloud-based providers have entry-level offerings that provide basic features for free or at a low cost.
 
The snippet below is an implementation of our _LogWriter_ for Loggly.
 
- configuration information is injected into the constructor (_ConfigurationService_)
  - contains the API key for your Loggly account
  - a boolean indicator to determine if the log item should be written to the console (_sendConsoleErrors_)
- the writer subscribes to the _logEntries\$_ Observable in the LoggingService
  - when the logging service publishes a new log entry, this writer prepares it for Loggly
- the writer formats the message and pushes the new item onto the LogglyService to send the log information to the cloud-based repository
 
```ts
import { LogWriter } from "./log-writer";
import { ILogEntry } from "../i-log-entry";
import { ConfigurationService } from "@angularlicious/configuration";
import { Optional } from "@angular/core";
import { LogglyService } from "ngx-loggly-logger";
import { LoggingService } from "../logging.service";
import { IConfiguration, LogglyConfig } from "@angularlicious/configuration";
 
export class LogglyWriter extends LogWriter {
  config: LogglyConfig;
 
  constructor(
    @Optional() private configService: ConfigurationService,
    private loggingService: LoggingService,
    private loggly: LogglyService
  ) {
    super();
    if (this.configService && this.loggingService) {
      this.configService.settings$.subscribe(settings =>
        this.handleSettings(settings)
      );
      this.loggingService.logEntries$.subscribe(entry =>
        this.handleLogEntry(entry)
      );
    }
  }
 
  handleSettings(settings: IConfiguration) {
    if (settings) {
      this.config = settings.logglyConfig;
      this.hasWriter = true;
      console.log(`Initializing Loggly writer for messages.`);
    }
  }
 
  handleLogEntry(entry: ILogEntry) {
    if (this.hasWriter) {
      this.targetEntry = entry;
      this.execute();
    }
  }
 
  /**
   * This method is part of the [execute] pipeline. Do not call
   * this method outside of the context of the execution pipeline.
   *
   * Use to setup the [Loggly] writer with an [apiKey] from the
   * configuration service.
   *
   * It will use the configuration service to configure and initialize
   * and setup a new call to log the information to the writer.
   */
  public setup(): void {
    if (this.hasWriter) {
      try {
        this.loggly.push({
          logglyKey: this.config.apiKey,
          sendConsoleErrors: this.config.sendConsoleErrors
        });
 
        if (this.targetEntry.tags && this.targetEntry.tags.length > 0) {
          const tags = this.targetEntry.tags.join(",");
          this.loggly.push({ tag: tags });
        }
      } catch (error) {
        const message = `${this.targetEntry.application}.LogglyWriter: ${{
          ...error
        }}`;
        console.error(message);
      }
    }
  }
 
  /**
   * This method is part of the [execute] pipeline - it will be called if the
   * current [Log Entry] item is valid and the writer is initialized and ready.
   */
  public write(): void {
    this.loggly.push(this.formatEntry(this.targetEntry));
  }
 
  /**
   * Use this function to format a specified [Log Entry] item. This should be moved
   * to a specific [formatter] service that can be injected into the specified
   * writer.
   * @param logEntry
   */
  formatEntry(logEntry: ILogEntry): string {
    return `application:${logEntry.application}; source:${
      logEntry.source
    }; timestamp:${logEntry.timestamp.toUTCString()}; message:${
      logEntry.message
    }`;
  }
}
```
 
The image below shows the browser console with log events. This same information is sent to Loggly. The HTTP request contains the following payload.
 
```json
{
  "text": "application:angularlicious; source:angularlicious.GuideComponent; timestamp:Sat, 16 Nov 2019 13:02:43 GMT; message:Preparing to set [Google Analytics] page view for [/custom-angular-modules].",
  "sessionId": "9e71eb86-2352-42e5-959e-8efbf60946f5"
}
```
 
{width: 48%}
![Web page with console logs.](resources/images/web-page-with-console-logs.png)
 
You can use the Loggly website to view, filter, and search for specific log items. This is very practical when you need to determine if there are any health or diagnostic concerns for your application.
 
{width: 48%}
![Loggly event item.](resources/images/loggly-event.png)
 
## Error Handling
 
Another thing to be concerned about is error handling. Angular provides a default error handler.The default error handler writes events to the _console_ on the developer tools in the browser. So we also see a relationship between error handling and logging events in our application. We can provide a custom error handler for our application that does much more than just write the event to the console.
 
Errors and exceptions happen. Period. There are too many factors and dependencies to prohibit any errors from happening. Therefore, they need to be handled. And systems, users, and application administrators need notifications about errors. _It is better to know about an error or exception during development than after a deployment to production._
 
> It would be an error on our part to not consider adding a custom Error Handler to your Angular Workspace. You need it. This is not one of those things that you put into the category of we'll add this later when we have time.
 
Here are some things to consider for your error handling scenarios.
 
1. Error Handling
   - Determine where error handling should take place in the application - responsibility.
   - Should there be a single source of error handling?
   - What do you do with the error details and source?
   - Do you deliver a generic error message, "Oops!" to the user?
   - How do you handle different types of errors?
     - HttpClient
     - Application
     - 3rd-party library
     - API/Server
2. Error Notification
   - Determine if the end user should be notified of the error.
   - Should application/system administrators be notified - how?
3. Error Logging (Tracking)
   - Determine what is required for logging/tracking.
   - Need to understand the context of the error.
   - Do not log too little - need relevant information.
   - When did it occur? What additional information should be included in the log message?
4. Custom Error Classes
   - instanceOf
   - extending Error Classes
   - adding rich meta data
 
### Error Sources
 
We can categorize `error sources` in (3) groups.
 
1. External
2. Internal
3. Application
 
#### External Errors
 
External errors are `external` from the running application. In our case, they are external to our Angular application running in a client browser. These occur on servers or APIs outside of our application's runtime environment. Server errors happen while attempting to process the request or during processing on the server.
 
- database connection errors
- database errors
- server exceptions
- application not available
 
##### Server
 
Most Angular applications use some kind of back end API(s) or server to perform additional application processing. Even if the Angular application is `serverless` - meaning that it doesn't have its own specific server associated to the application. In this case the Angular application may use several APIs and functions that are hosted by 3rd-party providers (think: APIs for MailChimp, Contentful, Firebase, Medium, or Google Cloud Platform etc.).
 
Regardless of the source of these `external` errors, an Angular application needs to handle them gracefully.
 
- 500 Errors: The server failed to fulfill a request.
 
> Response status codes in the 500-range indicate cases in which the server
> is aware that it has encountered an error or is otherwise incapable of performing the
> request. Except when responding to a HEAD request, the server should include an entity
> containing an explanation of the error situation, and indicate whether it is a
> temporary or permanent condition. Likewise, user agents should display any included
> entity to the user. These response codes are applicable to any request method.
 
Here is an example of some of the types of `500` Server Errors that can happen.
 
- **500 Internal Server Error**: A generic error message, given when an unexpected condition was encountered and no more specific message is suitable.[62]
- **501 Not Implemented**: The server either does not recognize the request method, or it lacks the ability to fulfil the request. Usually this implies future availability (e.g., a new feature of a web-service API).[63]
- **502 Bad Gateway**: The server was acting as a gateway or proxy and received an invalid response from the upstream server.[64]
- **503 Service Unavailable**: The server is currently unavailable (because it is overloaded or down for maintenance). Generally, this is a temporary state.[65]
 
#### Internal Errors
 
The error may be due to invalid input provided by the request, failed business rules or failed data validation. The request may be mal-formed - and therefore, cannot be processed (wrong media-type, payload too large, invalid permissions).
 
- 400 Errors
 
> This class of status code is intended for situations in which
> the error seems to have been caused by the client. Except when responding to a HEAD
> request, the server should include an entity containing an explanation of the
> error situation, and whether it is a temporary or permanent condition. These status
> codes are applicable to any request method. User agents should display any included
> entity to the user.
 
##### Client (Browser) - JavaScript
 
JavaScript has an [Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error) object that all errors in JavaScript derive from. The standard available properties for an error are as follows:
 
- columnNumber
- fileName
- lineNumber
- message
- name
- stack
 
This is the information that we see in the Console of the browser's developer tools. Here is a list of specialized types of errors that can occur.
 
- [EvalError (not thrown any more (remains for compatibility)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/EvalError)
- [InternalError](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/InternalError)
- [RangeError](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RangeError)
- [ReferenceError](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ReferenceError)
- [SyntaxError](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SyntaxError)
- [TypeError](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError)
- [URIError](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/URIError)
 
#### Application Errors
 
Believe it or not, applications can also be the source of `errors`. These could be exceptional - meaning that they are unanticipated. However, when they do happen, the current flow of application flow is redirected to a registered provider for _handling_ the error.
 
Developers, coders, and software engineers cannot write perfect code. The vast number of conditions, processing paths, algorithms, calculations, and other things that happen during the runtime of an application make it impossible to anticipate all scenarios.
 
Therefore, errors happen and we see them in the following cases:
 
1. Business Rule Violations
2. Data Validation Errors
3. Application Exceptions
 
### Handle Errors in Angular
 
Regardless the origination of an error, an Angular application needs the ability to handle errors. Angular has a default `ErrorHandler` that is provided to the application when the application is `initialized`. This `ErrorHandler` catches and handles all unanticipated errors.
 
Handling errors means:
 
- handling the error gracefully
- not allowing the error to disable the progress of the application
- storing information about the error event in a centralized repository
- providing notifications to interested parties.
 
It is really nice that they Angular platform includes such a feature.
 
```ts
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
 
import {
  ERROR_ORIGINAL_ERROR,
  getDebugContext,
  getErrorLogger,
  getOriginalError
} from "./errors";
 
export class ErrorHandler {
  /**
   * @internal
   */
  _console: Console = console;
 
  handleError(error: any): void {
    const originalError = this._findOriginalError(error);
    const context = this._findContext(error);
    // Note: Browser consoles show the place from where console.error was called.
    // We can use this to give users additional information about the error.
    const errorLogger = getErrorLogger(error);
 
    errorLogger(this._console, `ERROR`, error);
    if (originalError) {
      errorLogger(this._console, `ORIGINAL ERROR`, originalError);
    }
    if (context) {
      errorLogger(this._console, "ERROR CONTEXT", context);
    }
  }
 
  /** @internal */
  _findContext(error: any): any {
    if (error) {
      return getDebugContext(error)
        ? getDebugContext(error)
        : this._findContext(getOriginalError(error));
    }
 
    return null;
  }
 
  /** @internal */
  _findOriginalError(error: Error): any {
    let e = getOriginalError(error);
    while (e && getOriginalError(e)) {
      e = getOriginalError(e);
    }
 
    return e;
  }
}
 
export function wrappedError(message: string, originalError: any): Error {
  const msg = `${message} caused by: ${
    originalError instanceof Error ? originalError.message : originalError
  }`;
  const error = Error(msg);
  (error as any)[ERROR_ORIGINAL_ERROR] = originalError;
  return error;
}
```
 
The actual code for the Angular `ErrorHandler` contains comments and an example.
 
> Provides a hook for centralized exception handling.
>
> The default implementation of `ErrorHandler` prints error messages to the `console`. To intercept error handling, write a custom exception handler that replaces this default as appropriate for your app.
 
The recommendation, although embedded in a comment, is to create our own implementation of the `ErrorHandler` to provide a more direct and customized handling of errors. The default error handler writes errors to the application's console. This is great during development. But it doesn't solve a requirement of having a centralized repository of error messages.
 
> Angular applications are single-page applications where each application instance is on a browser. We do not have access to a user's browser when the application is published. We want a centralized repository for this information.
 
The code sample shows that we can create our own class that implements the `ErrorHandler` interface. A custom handler
needs to override and provide a concrete implementation of the `handleError()` method. Additionally, add the `@Injectable` decorator to allow the provider to participate in Angular dependency injection.
 
> There are (2) ways to provide a [singleton service](https://angular.io/guide/singleton-services) for your application.
>
> 1. use the `providedIn` property, or
> 2. provide the module directly in the AppModule of the application
 
Since we want to override the default ErrorHandler for the Angular application, please remove the `providedIn` configuration
 
```ts
@Injectable({
  //providedIn: "root"
})
class MyErrorHandler implements ErrorHandler {
  handleError(error) {
    // do something with the exception
  }
}
```
 
#### Custom Error Handler
 
Here is a sample Error Handling service that will log error messages using a LoggingService. This implementation requires some configuration to be provided to the service. The `handleError()` determines the type of error and processes accordingly.
 
> Note: If the error type is a _HttpErrorResponse_ (i.e., response status code is 400s or 500s) type and is **_not_** an _ErrorEvent_ (i.e., generalized JavaScript error) - there is no operation or logging performed. The HTTP service (a different cross-cutting concern) handles error during the execution of HTTP calls. If there are HTTP errors or an HTTP response contains a known API error response body, the HTTP service will throw an Observable error to allow the consumer to handle it using the Observable pattern.
 
- the configuration provides a `includeDefaultErrorHandling` boolean property to indicate if logging to the application console should be performed. Normally this is set to false during for production environment deployments.
- a LoggingService is injected into the constructor to allow the service to log error information
 
> Note: the logging service requires some configuration. Please see the [Configuration](#configuration) section for more information on how to provide configuration to cross-cutting concern modules and services.
 
```ts
@Injectable({
  providedIn: "root"
})
export class ErrorHandlingService extends ErrorHandler {
  serviceName = "ErrorHandlingService";
  config: ErrorHandlingConfig;
  hasSettings: boolean;
 
  constructor(
    private configService: ConfigurationService,
    private loggingService: LoggingService
  ) {
    super();
 
    this.init();
  }
 
  init() {
    this.config = new ErrorHandlingConfig();
    this.config = {
      applicationName: "Angular",
      includeDefaultErrorHandling: true
    };
    this.config.applicationName = "ErrorHandlerService";
    this.config.includeDefaultErrorHandling = false;
    console.warn(`Application [ErrorHandler] is using default settings`);
 
    this.configService.settings$
      .pipe(take(1))
      .subscribe(settings => this.handleSettings(settings));
  }
 
  handleSettings(settings: IConfiguration) {
    if (settings && settings.errorHandlingConfig) {
      this.config = settings.errorHandlingConfig;
      this.hasSettings = true;
 
      this.loggingService.log(
        this.config.applicationName,
        Severity.Information,
        `Application [ErrorHandler] using configuration settings.`
      );
    }
  }
 
  /**
   * Use to handle generalized [Error] items or errors from HTTP/Web
   * APIs [HttpErrorResponse].
   *
   * @param error
   */
  handleError(error: Error | HttpErrorResponse): any {
    if (this.config.includeDefaultErrorHandling) {
      // use the [super] call to keep default error handling functionality --> console;
      super.handleError(error);
    }
 
    if (this.hasSettings) {
      // A. HANDLE ERRORS FROM HTTP
      if (error instanceof HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
          // A.1: A client-side or network error occurred. Handle it accordingly.
          const formattedError = `${error.name}; ${error.message}`;
          this.loggingService.log(
            this.config.applicationName,
            Severity.Error,
            `${formattedError}`
          );
        } else {
          // A.2: The API returned an unsuccessful response (i.e., 400, 401, 403, etc.).
          /**
           * The [HttpService] should return a response that is consumable by the caller
           * of the API. The response should include relevant information and error messages
           * in a format that is known and consumable by the caller of the API.
           */
          noop();
        }
      } else {
        // B. HANDLE A GENERALIZED ERROR FROM THE APPLICATION/CLIENT;
        const formattedError = `${error.name}; ${error.message}`;
        this.loggingService.log(
          this.config.applicationName,
          Severity.Error,
          `${formattedError}`
        );
      }
    }
  }
}
```
 
There is a lot of logic in the `handleError()` method. First, it will use the configuration information to determine if it should log the event using the default base class. This will essentially log the item to the browser console.
 
```ts
if (this.config.includeDefaultErrorHandling) {
  // use the [super] call to keep default error handling functionality --> console;
  super.handleError(error);
}
```
 
Next, there is a check to determine the type of error to handle. There are (2) possible sources and the processing paths are different based on the type.
 
> A. HANDLE ERRORS FROM HTTP
>
> B. HANDLE A GENERALIZED ERROR FROM THE APPLICATION/CLIENT;
 
#### A. HANDLE ERRORS FROM HTTP
 
If the source of the error is from an HTTP operation, the error could originate from JavaScript while preparing the request or when handling the response. We can check the error to determine if it is an _instanceof_ `ErrorEvent`. This type of error is most-likely unanticipated and should be logged.
 
```ts
if (error.error instanceof ErrorEvent)
```
 
The second type of HTTP error is based on the HTTP Status Code of the HTTP response. If the status code is in the 400 or 500 categories, the response is considered to be in an error state. However, since we are most likely working with the application's Web API, we want to defer to the processing logic of our HTTP service (See the [Handle HTTP Errors](#handle-http-errors) section). There are few reasons for this.
 
- the web API could be sending a valid response - it just has a specified status code that indicates an error of some sort
- the web API may include and probably should include a payload that provides information about the specified request and any error messages. See [API Response Schema/Model](#api-response-schemamodel) section.
  - perhaps sending a list of validation error messages
  - or, it may be a failed business rule
  - the consumer of the web API did not receive a successful response and needs to provide information to the user about the status of the request.
- the consumer of the web API response is expecting an Observable event to handle and process
  - the HTTP service can return the response with the payload that includes the error information as an Observable (application validation or business rule failure)
  - if the web API response payload is not known (server error), the HTTP service can wrap a generic error message in a response format that the consumer is expecting and return it as an Observable.
 
In this scenario, we will do nothing and allow the HTTP service to handle the error.
 
```ts
// A.2: The API returned an unsuccessful response (i.e., 400, 401, 403, etc.).
/**
 * The [HttpService] should return a response that is consumable by the caller
 * of the API. The response should include relevant information and error messages
 * in a format that is known and consumable by the caller of the API.
 */
noop();
```
 
#### B. HANDLE A GENERALIZED ERROR FROM THE APPLICATION/CLIENT
 
This is truly an unexpected JavaScript error of type `Error`. We want the application's custom Error Handler to handle the error by creating a new log event item with a severity status of *Error*.
 
```ts
const formattedError = `${error.name}; ${error.message}`;
  this.loggingService.log(
    this.config.applicationName,
    Severity.Error,
    `${formattedError}`
  );
```
 
#### Provide Custom Error Handler
 
Provide the custom error handler in the applications root module `AppModule`, use the `providers` configuration and the `useClass` property with the type of the new `ErrorHandler`. This basically injects our custom class into the application as the new _default_ error handler provider. Providing it at the root level of the application makes the `MyErrorHandler` globally available to the entire application.
 
```ts
@NgModule({
  providers: [
    {
      provide: ErrorHandler,
      useClass: MyErrorHandler
    }
  ]
})
class AppModule {}
```
 
The Angular `ErrorHandler` is initialized very early in the application's load life cycle. Therefore, you need to initialize a custom provider early.
 
#### Error Handling References
 
- [Error Handling and Angular](https://medium.com/@aleixsuau/error-handling-angular-859d529fa53a)
- [HTTP Status Codes](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes#4xx_Client_errors)
- [JavaScript Error Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)
- [Exceptional Exception Handling in JavaScript](https://www.sitepoint.com/exceptional-exception-handling-in-javascript/)
- [Angular ErrorHandler (error_handler.ts)](https://github.com/angular/angular/blob/master/packages/core/src/error_handler.ts)
- [Angular HttpClient :: Error Handling](https://angular.io/guide/http)
- [Angular HttpResponse](https://angular.io/api/common/http/HttpErrorResponse)
- [Angular HttpResponseBase](https://angular.io/api/common/http/HttpResponseBase)
- [Chocolate in my Peanut Butter](https://www.youtube.com/watch?v=DJLDF6qZUX0)
 
## Configuration
 
Most Angular applications that require configuration will take advantage of the *environment* constant where you can set application-wide configuration items for each of the environments. Angular provides a *fileReplacement* mechanism to assist in this regard. Therefore, we have a convenient mechanism to provide environment-specific configuration for an application.
 
We can take advantage of the same pattern and create configuration for our cross-cutting concern providers (i.e., services) that need environment and application specific configuration.
 
### Provide Configuration to Cross-Cutting Concern Libraries
 
Library projects cannot reference or import anything from an application project. If this was possible it would immediately create a circular dependency for the cross-cutting libraries. Therefore, we need a way for a library to get configuration information during the runtime of an application instance.
 
### Define the Configuration
 
Create a *constant* that provides the structure for your configuration. In this example, an *interface* defines the members of the configuration container. Notice that each of the cross-cutting concerns that need configuration has its own definition (schema/interface) - and it should specific to the environment as well.
 
- logging
- error handling
- loggly log writer (cloud-based) repository for log items
 
Each cross-cutting library (module) that needs configuration has a corresponding interface to define the specific configuration members of that item. This separation of concerns keeps things organized and reduces the chance of using the wrong configuration. 
 
```ts
import { ILoggingConfig } from './config/i-logging-config';
import { IErrorHandingConfig } from './config/i-error-handling-config';
import { ILogglyConfig } from './config/i-loggly-config';
 
export interface IConfiguration {
  applicationName: string;
  loggingConfig: ILoggingConfig;
  errorHandlingConfig: IErrorHandingConfig;
  logglyConfig: ILogglyConfig;
}
```
 
The TypeScript *const* contains a concrete implementation for the application configuration.
 
```ts
import {
  IConfiguration,
} from '@angularlicious/configuration';
import {} from '@angularlicious/error-handling';
 
export const AppConfig: IConfiguration = {
  applicationName: 'Angularlicious.LMS',
  loggingConfig: {
    applicationName: 'Angularlicious.LMS',
    isProduction: false,
  },
  errorHandlingConfig: {
    applicationName: 'Angularlicious.LMS',
    includeDefaultErrorHandling: true,
  },
  logglyConfig: {
    applicationName: 'Angularlicious.LMS',
    apiKey: '11111111-1111-1111-1111-111111111111',
    sendConsoleErrors: true,
  };
}
```
 
### Transform the Configuration (File Replace)
 
Most of the time, there are subtle differences between development and production environments. Some enterprise applications may have additional environments. We can use the *configuration* node in the architect|build section (see: angular.json file) to configure any file replacements that the configuration requires. The *fileReplacements* is an array of `{replace, with}` items.
 
> Note: The build configuration for all of the workspace projects is in the *angular.json* file. Find the specific project and update the configuration|production|fileReplacements section.
 
```json
"configurations": {
  "production": {
    "fileReplacements": [
      {
        "replace": "apps/lms-admin/src/environments/environment.ts",
        "with": "apps/lms-admin/src/environments/environment.prod.ts"
      },
        {
          "replace": "apps/lms-admin/src/assets/app-config.ts",
          "with": "apps/lms-admin/src/assets/app-config.production.ts"
        }
    ],
  }
}
```
 
### Load the Configuration
 
Angular applications take advantage of dependency injection to share instances of providers. A provider may be a service, class, or value that is loaded into an *injector*. We also need to provide the configuration which is currently a *TypeScript Object Literal*, essentially an object with data. Each Angular application contains a single root injector that is responsible for injecting all things provided at the root-level.
 
It is recommended that providers are added to the root-level injector by default if at all possible. This is exactly what needs to happen for the application's configuration and cross-cutting concern services (i.e., logging, error handling, etc.). The application only needs a single instance of these providers.
 
A root-level injector implies that there can be other levels or branches of injectors within an application. For example, when a module is lazy-loaded a new injector is created for that module. This impacts the use of *providers* from a shared module. It is a common practice to create a *shared* module to group related things together; as well as provide a set of services. When a lazy-loaded module would like to use the items provided by a shared module it has no way of accessing those items. Why? It is because they are scoped to the shared module at this time. However, if we could just provide those items from a shared module to the root-level injector.
 
In this example, the shared module to configures and provides all of the cross-cutting providers (i.e., services like configuration, error handling, logging, and log writers). When the lazy-loaded module requires a provider with the same Key as one that is loaded in the root-level injector, you would think by default that the lazy-loaded module would get the provider from the root-level injector. This is *not* the case! What? The lazy-loaded module has its own injector and will initialize its own set of providers required by the module that have the same key/name. But there is another, way that is.
 
> Note: You may need to create a unique identifier or timestamp for these providers if you want to see that they are actually different instances than the singletons contained in the root-level injector of the application.
 
In some cases, there may not be any side effects from this behavior. However, if you are expecting all modules lazy-loaded or not to use the same provider (i.e., as a singleton) instance throughout the application we have to do something a little different.
 
> Learn more about [Shared Modules and Dependency Injection](https://angular-2-training-book.rangle.io/modules/shared-modules-di) at [Rangle.io](https://rangle.io).
 
We will not add items to the *providers* array in the shared `@NgModule` decorator because this will basically provide them using an injector that is specific to the shared module and not the application's root-level injector. Instead, a static `forRoot()` is created to allow a consumer of this *shared* module and its providers to basically *push* the providers to the root-level injector by calling this method.
 
To provide items from a *shared* module to the root-level injector, use the `forRoot()` static method when importing the module in the *AppModule*. Learn more about  [Sharing the Same Dependency](https://angular-2-training-book.rangle.io/modules/shared-di-tree) at Rangle.io. Now that the providers (all of our cross-cutting concern services) are contained in the root-level injector of the application, they will *also* be available to all lazy-loaded modules - magic!
 
```ts
@NgModule({
  imports: [
    CrossCuttingModule.forRoot(),
    SharedModule,
    SiteModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  declarations: [AppComponent, AdminLayoutComponent],
  exports: [],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```
 
The return object of the forRoot() method is an object literal that returns the shared module and all of its providers - including the ones that requires some special handling with the *APP_INITIALIZER*.
 
```ts
/**
 * The factory function to initialize the logging service and writer for the
 * application.
 *
 * @param loggingService
 * @param consoleWriter
 */
export function initializeLogWriter(consoleWriter: ConsoleWriter) {
  console.log(`Initializing [Console Writer] from [AppModule]`);
  return () => {
    return consoleWriter;
  };
}
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ErrorHandlingModule,
    LoggingModule,
    ConfigurationModule.forRoot({ config: AppConfig }),
    SecurityModule,
  ],
  providers: [
    // DO NOT ADD PROVIDERS HERE WHEN USING [SHARED] MODULES; USE forRoot();
  ],
})
export class CrossCuttingModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CrossCuttingModule,
      providers: [
        ConfigurationService,
        LoggingService,
        ConsoleWriter,
        LogglyWriter,
        {
          provide: APP_INITIALIZER,
          useFactory: initializeLogWriter,
          deps: [LoggingService, ConsoleWriter, LogglyWriter],
          multi: true,
        },
        {
          provide: ErrorHandler,
          useClass: ErrorHandlingService,
          deps: [ConfigurationService, LoggingService],
        },
        AuthenticationService,
      ],
    };
  }
}
```
 
### Push the Configuration
 
There is now a mechanism to define configuration and to load providers at the root-level injector of the application. There is one last step to this entire process. We still need to get the configuration to each provider that has a configuration concern. Leverage the capabilities of Angular and RxJS to push the configuration when it is available.
 
In the *CrossCuttingModule*, the import of the *ConfigurationModule* calls the `forRoot()` method to provide the configuration to the module. What does this mean? It basically does what we were doing for the shared module - it provides the configuration to the root-level dependency injector. Now the configuration is available to the application. 
 
```ts
}
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ErrorHandlingModule,
    LoggingModule,
    ConfigurationModule.forRoot({ config: AppConfig }),
    SecurityModule,
  ],
  providers: [
    // DO NOT ADD PROVIDERS HERE WHEN USING [SHARED] MODULES; USE forRoot();
  ],
})
```
 
The *ConfigureContext* is provided to the application with the *AppConfig* that contains all of the required configuration information. Now that the configuration is provided and available to access, the ConfigurationService can use the configuration.
 
```ts
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigurationContext } from './configuration-context';
 
@NgModule({
  imports: [CommonModule],
})
export class ConfigurationModule {
  static forRoot(configContext: ConfigurationContext): ModuleWithProviders {
    console.log(`Preparing to handle configuration context.`);
    return {
      ngModule: ConfigurationModule,
      providers: [
        {
          provide: ConfigurationContext,
          useValue: configContext,
        },
      ],
    };
  }
}
```
 
The *ConfigurationContext* is injected into the constructor of the *ConfigurationService*. The service will now take advantage of publishing the configuration via a *readonly* Observable. Notice that the Observable `settings$` accessiblility is read-only. Consumers of the configuration are not allowed to publish any changes to the configuration. Changes are published once when the configuration is available using the *ReplaySubject* of 1.
 
```ts
private settings: Subject<IConfiguration> = new ReplaySubject<IConfiguration>(1);
public readonly settings$: Observable<IConfiguration> = this.settings.asObservable();
```
 
The *ConfigurationService* is a humble service but its job is very important. Its job is to act like a mediator between the application and the providers to push the configuration to any providers that subscribe to the *settings$* Observable.
 
> Note: the *ConfigurationService* pushes the configuration to the subscribers. This is the Angular way. There is no need for each provider to retrieve its own configuration - the dependency injection pattern is to provide what is asked for and to not allow consumers to create or provide their own dependencies.
 
```ts
import { Injectable, Optional } from '@angular/core';
import { Subject, ReplaySubject, Observable } from 'rxjs';
import { IConfiguration } from './i-configuration';
import { ConfigurationContext } from './configuration-context';
 
@Injectable({
  providedIn: 'root',
})
export class ConfigurationService {
  private settings: Subject<IConfiguration> = new ReplaySubject<IConfiguration>(1);
  public readonly settings$: Observable<IConfiguration> = this.settings.asObservable();
 
  constructor(@Optional() context: ConfigurationContext) {
    if (context) {
      this.settings.next(context.config);
    }
  }
}
```
 
### Configuration Summary
 
Configuration is a very important aspect of an enterprise application. The more that we make use of libraries and cross-cutting concerns - the more important it is to have the capability to provide configuration to different parts of the application. These may also include core domain libraries that contain application specific business logic for that specified domain. Therefore, create a reliable, consistent, and repeatable way to:
 
- define configuration schema/interface for a specific concern
- create a concrete configuration based on the interface
- push the configuration to any subscribers
- provide the configuration and cross-cutting concerns to the root-level dependency injector
 
## API Response Schema/Model
 
Many applications communicate with 3rd-party APIs or the application's own API hosted on a server. Therefore, one main aspect of the application is the ability to make HTTP requests and to properly handle the HTTP response. I think it is important to define a schema for the HTTP response. The schema is a contract between the client and back end Web APIs. This works when you are building the back end Web APIs to support the application and can coordinate what the *shape* or *schema* of the response will look like. 
 
This response schema should include an indicator of success. An API scheme should also include a payload property that contains the data returned by the back end server. If the API has any messages that it would like to provide to the user or the consuming application, it should provide these in a message list in the API response schema.
 
Having a well defined and well known API schema is very important for the consuming application to handle and process the responses from the back end server. It allows the client application to have a consistent and reliable format and mechanism for processing the response of any API request.
 
### Why Define an API Response
 
It might seem like an added layer of complexity at the moment. Or, it may seem like it isn't that important. You may be satisfied with making an HTTP/Web API call and dealing with everything in an optimistic mindset as if there will never be any errors in the processing of a request.
 
The truth is that error will happen. Not all requests are successful and return the payload of data. Additionally, if something goes wrong would it be nice to have the capability to display information to the user to let them know what happened or what they may do to correct the problem.
 
To put it into perspective, I recently worked on a web form that literally had 6 different formats for various responses (i.e., asynchronous validators and form submission). Displaying any relevant information to the user was an exercise in chaos. The original implementation just displayed the word *Error* without any other information for the user. Very sad! By the way, this application contains about 150 HTTP/Web API calls and each one of them is a *snowflake* (i.e., each request has a different implementation on handling the response and any errors). Many of the response came back as success, status code 200/OK, but only contained cryptic error messages. This is confusing and unnecessary with a little design and planning. Keep it consistent by plan.
 
> ***Pro Tip***: Define an API Response that is reliable. It will save you hours of frustration during development - and it will allow for a consistent mechanism to communicate information with the users. It supports consistent error handling and processing of HTTP requests.
 
### A Base Response
 
The `ApiResponse<T>` is an abstract class that provides the basic structure for any HTTP response. This is one that I am currently using. However, I recommend that you work with the Web API developers and agree upon a response schema. There are quite a few styles for a response schema. Please do some research and determine what is most appropriate for you application and context. 
 
- is an *abstract* class to allow for a success and error type response sub-classes
- uses *Generics* to allow you to indicate the expected type for the model/entity
- *IsSuccess* to indicate if the response is successful or not; seems arbitrary at the moment, but is very useful in determine the processing path of the response if it contains any error messages
- *Timestamp*: use to indicate the date and time the response was issued by the server 
 
```ts
export abstract class ApiResponse<T> {
  IsSuccess: boolean;
  Message: string;
  StatusCode: number;
  Timestamp: Date;
}
```
 
### Success API Response
 
It is likely that most of the responses you get from your application's Web API are successful and return with a payload of data. The `SuccessApiResponse<T>` class just extends the base class so that it also has common information - no matter if it is successful or not.
 
- contains a `Data` property of type `T` to allow the client to indicate what the data payload type should be.
- contains a list of *ApiMessage* items to allow the Web API to return any information useful to the application or to display to the user.
 
```ts
import { ApiResponse } from './api-response';
import { ApiMessage } from './api-message';
 
/**
 * Use to define a successful API response. A successful response will
 * most likely include a payload of data (i.e., use the Data property).
 */
export class SuccessApiResponse<T> extends ApiResponse<T> {
  Data: T;
  Messages: ApiMessage[];
}
```
 
### Error API Response
 
In the unlikely event, the application's Web API returns an error or failure response it should be in a well-defined format to allow the application to process it and retrieve any messages from the response.
 
> Note that this response does not contain a *Data* property. The expected payload is not available or provided by the API when the operation is in an error state.
 
You get a list of *messages* that provide valuable information to the application and also to the user. If you need a consistent mechanism to provide information to the user from the back end of you application this is the way to do it.  
 
```ts
import { ApiResponse } from './api-response';
import { ApiMessage } from './api-message';
 
/**
 * Use to provide error information from an API. You can also
 * use this class to create a response with errors while doing
 * error handling.
 *
 * Errors: is a list om [ApiErrorMessage] items that contain specific
 * errors for the specified request.
 */
export class ErrorApiResponse<T> extends ApiResponse<T> {
  Errors: ApiMessage[] = [];
}
```
 
### API Messages
 
This is the equivalent of two tin cups and a string that attaches them together - it is a way to communicate a message from one end of the application to the other end (client). If the application's Web API needs to communicate any information to the application and/or the user of the application it needs a message.
 
This is a message format that is generic enough to provide messages that are informational, warning, or indicate an error of some sort.
 
- contains an *ApiMessageSeverity* enum property to indicate the level of severity
- use the *isDisplayable* boolean indicator to determine whether the message is intended for the user or not
 
```ts
import { ApiMessageSeverity } from './api-message-severity.enum';
 
export class ApiMessage {
  id?: string;
  message: string;
  severity: ApiMessageSeverity;
  isDisplayable: boolean;
 
  /**
   * Use to create a new [ApiErrorMessage]
   * @param message The error from the API.
   * @param displayable Use to indicate if the error should be displayed to the user.
   * @param id An optional identifier for the error.
   */
  constructor(message: string, displayable: boolean, id: string | null) {
    this.message = message;
    this.isDisplayable = displayable;
    if (id) {
      this.id = id;
    }
  }
}
```
 
The *ApiMessageSeverity* is useful if you need to style or format the display of the information based on the severity level. It is nice to be able to provide error messages, but it also a nice feature to provide messages that informative to the user.
 
```ts
export enum ApiMessageSeverity {
  Information = 'Information',
  Warning = 'Warning',
  Error = 'Error',
}
```
 
## HTTP Service
 
Most applications require the use of Web APIs or a dedicated back end to retrieve and persist information. If the application makes HTTP requests and processes HTTP responses to provide useful data or information, it will need to use the Angular *HttpClient*. In my experience, I have seen many different (i.e., *how*) implementations of the HttpClient to perform HTTP related concerns. Also, *where* these operations are implemented is interesting - never in the same place.
 
> ***Pro Tip***: When using a layered architecture determine where and how to implement HTTP requests. It should be consistent throughout all of the domain verticals and/or specified layer of the domain item. This is definitely one item where variance, deviation from acceptable patterns/recipes, and chaos could make an application virtually unmaintainable. The long-term effects of *snowflake* implementations is a pile of technical debt that is not easy to overcome. The best thing to do is to eliminate technical debt with proper planning and implementation.
 
Each domain section will have its own HTTP service that is specific to the API operations that is requires. However, the way or mechanism to construct, execute and handle an HTTP request should be consistent and maintainable. Therefore, make use of a library project to create a new cross-cutting concern for HTTP-related things.
 
> **Goal**: To enable HTTP/Web API calls to be constructed, managed, and executed using a repeatable and reliable mechanism. Most if not all HTTP requests should be constructed using the same pattern/recipe. There should be little or no reason to not use such a mechanism. When you want to extend or add new features - there will be a single-location to make such changes. The current application I'm working on has over 150 variations of processing HTTP requests.
 
### HTTP Service Responsibilities
 
The HTTP Service has some basic responsibilities and concerns.
 
- create the HTTP request **options**
  - set the request *method* (i.e., post, get, put, etc.)
  - add *header* information to the request if required
  - set the target *URL* for the request
  - include an optional *body* payload
- **execute** the request
- handle any **errors**
 
The following *HttpService* class is basically using and wrapping some concerns using the *HttpClient* from `@angular/common/http`. It may seem trivial at first to create such a class. Consider, where HTTP calls should be make within your application - location matters. Consider how they are implemented and really who or what should have the responsbility or concern. When you think about it, an HTTP call is one of the last tasks you perform within an application for a specific operation. The request is executed and the application has to wait for some kind of response.
 
Create a new *HttpService* library project and service with the Angular CLI:
 
```ts
ng g library httpService
ng g service httpService --project=http-service
```
 
The sample class below is only doing a few things. Mostly, creating the *options* for an HTTP request. The *options* is a container for the information required to execute an HTTP request. The `execute<T>()` makes use of the Angular HttpClient. Unless you practice the mystical art of *optimistic* programming, there will be errors and exceptions during HTTP operations - please do not ignore these, but [handle them](#handle-http-errors). 
 
- **`createOptions()`**: a primary method to construct HTTP options using a specific recipe
- **`createHeader`**: a helper method to add header information to the HTTP options. Modify to suite your needs
- **`execute<T>()`**: a primary method of the service to wrap the HttpClient request
- **`handleError()`**: use to handle errors when they happen
 
```ts
import { Injectable } from '@angular/core';
import { HttpRequestMethod } from './http-request-methods.enum';
import {
  HttpHeaders,
  HttpClient,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { HttpRequestOptions } from './http-request-options';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ApiResponse } from '@angularlicious/foundation';
import { ErrorApiResponse } from '@angularlicious/foundation';
import { ApiErrorMessage } from '@angularlicious/foundation';
 
@Injectable()
// { providedIn: 'root', }
export class HttpService {
  constructor(private httpClient: HttpClient) {}
 
  /**
   * Use to create [options] for the API request.
   * @param method Use to indicate the HttpRequest verb to target.
   * @param headers Use to provide any [HttpHeaders] with the request.
   * @param url Use to indicate the target URL for the API request.
   * @param body Use to provide a JSON object with the payload for the request.
   * @param withCredentials Use to indicate if request will include credentials (cookies), default value is [true].
   */
  createOptions(
    method: HttpRequestMethod,
    headers: HttpHeaders,
    url: string,
    body: any,
    withCredentials: boolean = true
  ): HttpRequestOptions {
    let options: HttpRequestOptions;
    options = new HttpRequestOptions();
    options.requestMethod = method;
    options.headers = headers;
    options.requestUrl = url;
    options.body = body;
    options.withCredentials = withCredentials;
    return options;
  }
 
  /**
   * Use to create a new [HttpHeaders] object for the HTTP/API request.
   */
  createHeader(): HttpHeaders {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return headers;
  }
 
  /**
   * Use to execute an HTTP request using the specified options in the [HttpRequestOptions].
   * @param requestOptions
   */
  execute<T>(requestOptions: HttpRequestOptions): Observable<ApiResponse<T>> {
    console.log(
      `Preparing to perform request to: ${requestOptions.requestUrl}`
    );
    return this.httpClient
      .request<T>(
        requestOptions.requestMethod.toString(),
        requestOptions.requestUrl,
        {
          body: requestOptions.body,
          headers: requestOptions.headers,
          reportProgress: requestOptions.reportProgress,
          observe: requestOptions.observe,
          params: requestOptions.params,
          responseType: requestOptions.responseType,
          withCredentials: requestOptions.withCredentials,
        }
      )
      .pipe(
        retry(1),
        catchError((errorResponse: any) => {
          return this.handleError(errorResponse);
        })
      );
  }
 
  /**
   * Use to handle errors during HTTP/Web API operations. The caller expects
   * an Observable response - this method will either return the response from
   * the server or a new [ErrorApiResponse] as an Observable for the client to
   * handle.
   *
   * @param error The error from the HTTP response.
   */
  protected handleError(error: HttpErrorResponse): Observable<any> {
    const apiErrorResponse = new ErrorApiResponse();
    apiErrorResponse.IsSuccess = false;
    apiErrorResponse.Timestamp = new Date(Date.now());
    apiErrorResponse.Message = 'Unexpected HTTP error.';
 
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      apiErrorResponse.Errors.push(
        new ApiErrorMessage(
          `A client-side or network error occurred. Handle it accordingly.`,
          true,
          null
        )
      );
      return throwError(apiErrorResponse);
    } else {
      // The API returned an unsuccessful response.
      if (error instanceof ErrorApiResponse) {
        // A known error response format from the API/Server; rethrow this response.
        return throwError(error);
      } else {
        // An unhandled error/exception - may not want to lead/display this information to an end-user.
        // TODO: MIGHT WANT TO LOG THE INFORMATION FROM error.error;
        apiErrorResponse.Errors.push(
          new ApiErrorMessage(
            `The API returned an unsuccessful response. ${error.status}: ${error.statusText}. ${error.message}`,
            false,
            null
          )
        );
        return throwError(apiErrorResponse);
      }
    }
  }
}
```
 
### Using the HTTP Service
 
If the processing of business rules and/or data validation goes well in the business layer of the application the next task to follow is typically an HTTP request to either retrieve, save, or update some information. Each domain vertical probably has a distinct set of Web API calls. Create a new service to handle the specific HTTP requests. An *@Injectable* service for HTTP calls is injected into a business provider within the specific domain service. A service of this type could also be the recipient of configuration information that includes *base URL* or other information required to execute the request.
 
The sample domain-specific HTTP service below contains an injected *HttpService*. The *LoggingService*  cross-cutting concern is also available for this service. Reusing code creates such a good feeling, right? There are only a few things to do to perform an HTTP operation:
 
1. configure the ***URL*** endpoint for the request
2. setup the ***options*** for the request (uses the URL)
3. ***execute*** the request using the new HttpService.
 
Note the simplicity in the following example of an application's HTTP service for the *ThingsToDo* domain feature. Consistent code is maintainable code - it is also easier to identify any deviations early.
 
```ts
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
 
import { ApiResponse, ServiceBase } from '@tc/foundation';
import { HttpService, HttpRequestMethod } from '@tc/http-service';
import { LoggingService } from '@tc/logging';
import { IThingsToDoHttpService } from './i-things-to-do-http.service';
 
@Injectable({
  providedIn: 'root',
})
export class ThingsToDoHttpService extends ServiceBase
  implements IThingsToDoHttpService {
  baseUrl = 'http://mybackend.com/api/';
  noCredentials = false;
  credentialsRequired = true;
 
  constructor(
    @Inject(HttpService) public httpService: HttpService,
    public loggingService: LoggingService
  ) {
    super(loggingService, 'ThingsToDoHttpService');
  }
 
  RetrieveThingsToDo<T>(): Observable<ApiResponse<T>> {
    const requestUrl = this.baseUrl.concat('things');
    const options = this.httpService.createOptions(
      HttpRequestMethod.get,
      this.httpService.createHeader(),
      requestUrl,
      null,
      this.noCredentials
    );
    return this.httpService.execute<T>(options);
  }
}
```
 
The use and implementation of an interface *IThingsToDoHttpService* is totally optional. There may be a case to use such a feature during initial development when the real API is not available or online.
 
```ts
import { Observable } from 'rxjs';
import { ApiResponse } from '@tc/foundation';
 
export interface IThingsToDoHttpService {
  /**
   * Use to retrieve things to do.
   */
  RetrieveThingsToDo<T>(): Observable<ApiResponse<T>>;
}
```
 
An interface-based approach allows you to create a fake HTTP service to provide an implementation that returns fake data. There are many different approaches to using and creating fake data from an API. Interfaces may make the implementation a little easier.
 
```ts
import { Injectable } from '@angular/core';
 
import { Observable, of, BehaviorSubject, throwError } from 'rxjs';
import { ThingToDo } from '../models/thingToDo.model';
import { IThingsToDoHttpService } from './i-things-to-do-http.service';
 
import {
  ApiResponse,
  ServiceBase,
  SuccessApiResponse,
  ErrorApiResponse,
  ApiErrorMessage,
} from '@angularlicious/foundation';
export class ThingsToDoFakeHttpService implements IThingsToDoHttpService {
  things: ThingToDo[] = [];
 
  RetrieveThingsToDo<T>(): Observable<ApiResponse<T>> {
    const response = new SuccessApiResponse();
    response.IsSuccess = true;
    response.Message = 'Successfully processed request for things.';
    response.Timestamp = new Date(Date.now());
    response.Data = this.loadThings();
 
    const subject: BehaviorSubject<any> = new BehaviorSubject(response);
    return subject.asObservable();
  }
 
  loadThings() {
    this.things = [];
    this.things.push(
      new ThingToDo(
        1,
        'Denver Taco Festival',
        'RiNo',
        'Eat tacos with your friends and some many Chihuahuas.'
      )
    );
    this.things.push(
      new ThingToDo(
        2,
        'Smooth Jazz Concert',
        'Arvada, CO',
        'Listen to Kenny G play his favorites.'
      )
    );
 
    return this.things;
  }
}
 
```
 
The feature module can provide the correct HTTP service based on the *environment* of the application runtime. The sample below demonstrates providing a service with the *useClass* and a ternary operator to determine which service to load: fake or real?
 
```ts
@NgModule({
  declarations: [VisitorIndexComponent, ThingsToDoComponent],
  imports: [
    CommonModule,
    SharedModule,
    SiteComponentsModule,
    VisitorRoutingModule,
  ],
  providers: [
    // ThingsToDoService, // NOT PROVIDED HERE, EACH COMPONENT REQUIRES A DISTINCT INSTANCE
    ThingsToDoBusiness,
    {
      provide: 'IThingsToDoHttpService',
      useClass: environment.production
        ? ThingsToDoHttpService
        : ThingsToDoFakeHttpService,
    },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class VisitorModule {}
```
 
### Handle HTTP Errors
 
Errors fall into the category of ***when*** and not ***if***. It is only a matter of time and circumstance that there will be an error during the operation of an HTTP request. Handling errors is a common practice and discipline in programming. We can *hope* that errors never occur- however, *hope* is never a good strategy for most things in life. A little preparation and forward-thinking will make the application safer. 
 
Many times, the error is from the _back end_ of an application - the Web API. If an error occurs on the back end, you typically get a 400 or 500 status code from the server. However, during the processing of an HTTP request, it is possible to get an error related to the processing of the HTTP request or the response. Basically, there is a lot of opportunity for things to go wrong.
 
> Note: This is a specialized handling of errors to use the Observable pattern while performing HTTP operations.
 
Do not be tempted to use `HttpClient` calls directly in your application components. We need a more reliable, consistent, and maintainable mechanism to handle errors while performing actions that use `HTTP` and Observables. It is also not an ideal situation to display `raw` error information to users.
 
For example, when using `HttpClient` you can call the `request()` method. Using the RxJs `pipe()` you can also use the `catchError()` which returns an `HttpErrorResponse` to be handled. Handling an error in a single location (not in the component Observable response) allows for greater control - it is also contained in a single location. I know this from experience, A current project that I joined after almost 3 years of development has approximately 200 variations of making HTTP calls and handling responses. The number of variations of error handling in this code is mind-boggling considering that only 2 developers implemented the API calls. Therefore, please consider the following principles in regard to error handling.
 
- single-responsibility
- DRY: don't repeat yourself
- separation of concerns
 
> ***Pro Tip***: There are many ways to handle errors. Some of the implementation details may be specific
> to the technology. Become familiar with error and exception handling practices.
> 
> Here are the goals for handling the error:
> 
> 1. ***inspection***: proactively expect exceptions and provide a mechanism to catch them
> 2. ***interpretation***: provide some information local to the error that gives meaning and context to the error
> 3. ***resolution***: catch and handle unexpected errors or exceptions; provide information to user or application that > helps mitigate or resolve an issue
 
The sample code below expect that there may be an error while processing the request. If an HTTP error happens, it will attempt to retry the operation at least once with `retry(1)` in the Observable pipeline. If there continues, it will be caught with the `catchError()` RxJS pipeline operation and handled. Handling HTTP errors is a specialized process because the process needs to determine the source of the error to engage the proper handling path. [More information about Handling HTTP Errors](#http-error-processing).
 
```ts
execute<T>(requestOptions: HttpRequestOptions): Observable<HttpResponse<ApiResponse<T>>> {
    try {
      return this.httpClient.request<T>(
        requestOptions.requestMethod.toString(),
        requestOptions.requestUrl,
        {
          headers: requestOptions.headers,
          observe: requestOptions.observe,
          params: requestOptions.params,
          reportProgress: requestOptions.reportProgress,
          withCredentials: requestOptions.withCredentials
        }
      ).pipe(
        retry(1)
        catchError((errorResponse: any) => {
          return this.handleError(errorResponse);
        })
      );
    } catch (error) {
      this.handleError(error);
    }
  }
```
 
The `HttpErrorResponse` contains details to determine the **source** of the error. Was it from the server/http or from within the application. This helps us to determine what type of information to provide the user, if any. At a minimum, you could log this information to help monitor the health of the application and determine if any improvements should be made.
 
[HttpErrorResponse](https://angular.io/api/common/http/HttpErrorResponse): A response that represents an error or failure, either from a non-successful HTTP status - an error while executing the request, or some other failure which occurred during the
parsing of the response.
 
I updated the signature of the `handleError()` method to include either type of `Error` or type of `HttpErrorResponse` - this allows for specialized handling based on the _type_ of error.
 
```ts
protected handleError(error: Error | HttpErrorResponse): Observable<any> {
  if(error.error instanceof ErrorEvent)  {
    // A client-side or network error occurred. Handle it accordingly.
  } else {
      // The API returned an unsuccessful response.
  }
  // handler returns an RxJS ErrorObservable with a user-friendly error message.
  // Consumers of the service expect service methods to return an Observable of
  // some kind, even a "bad" one.
  //
  // return throwError(error);
  return throwError(`Hey, you got my chocolate in your peanut butter.`);
}
```
 
Notice that the `HttpErrorResponse` type implements `Error`. Therefore, it contains information about the HTTP Request and also error information. These classes are already part of the Angular error handling eco-system. We can leverage the use of these types to create a more robust error handling flow for our applications.
 
```ts
class HttpErrorResponse extends HttpResponseBase implements Error {
  constructor(init: {...})
  get name: 'HttpErrorResponse'
  get message: string
  get error: any | null
  get ok: false
 
  // inherited from common/http/HttpResponseBase
  constructor(init: {...}, defaultStatus: number = 200, defaultStatusText: string = 'OK')
  get headers: HttpHeaders
  get status: number
  get statusText: string
  get url: string | null
  get ok: boolean
  get type: HttpEventType.Response | HttpEventType.ResponseHeader
}
```
 
The abstract base class for the `HttpResponse` provides the structure for other **HTTP Response** classes:
 
- HttpErrorResponse
- HttpHeaderResponse
- HttpResponse
 
```ts
abstract class HttpResponseBase {
  constructor(init: {...}, defaultStatus: number = 200, defaultStatusText: string = 'OK')
  get headers: HttpHeaders
  get status: number
  get statusText: string
  get url: string | null
  get ok: boolean
  get type: HttpEventType.Response | HttpEventType.ResponseHeader
}
```
 
### HTTP Error Processing
 
As mentioned previously, processing HTTP errors during Web API operations involve _Observables_. We will use the RxJS `catchError()` and then handle the error. The source of the error may be from the status code of the HTTP response or it may be a more generalized JavaScript error while attempting to send the request or handle the response. Therefore, we will need to determine the source of the error.
 
The `handleError()` implementation will determine what to do with the response. If the HTTP response status code is in an error state and the _body_ of the response is in the expected _ErrorApiResponse_ format, we can simply use the RxJS `throwError()` and send it on its way for handling by the consumer of the API.
 
If the error doesn't contain a _body_ in our expected format, we can wrap the error information into the expected format (generic message) and send it forward.
 
```ts
import { Injectable } from "@angular/core";
import { HttpRequestMethod } from "./http-request-methods.enum";
import {
  HttpHeaders,
  HttpClient,
  HttpResponse,
  HttpErrorResponse
} from "@angular/common/http";
import { HttpRequestOptions } from "./http-request-options";
import { Observable, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";
import { ApiResponse } from "@angularlicious/foundation";
import { ErrorApiResponse } from "@angularlicious/foundation";
import { ApiErrorMessage } from "@angularlicious/foundation";
 
@Injectable()
// { providedIn: 'root', }
export class HttpService {
  constructor(private httpClient: HttpClient) {}
 
  /**
   * Use to create [options] for the API request.
   * @param method Use to indicate the HttpRequest verb to target.
   * @param headers Use to provide any [HttpHeaders] with the request.
   * @param url Use to indicate the target URL for the API request.
   * @param body Use to provide a JSON object with the payload for the request.
   * @param withCredentials Use to indicate if request will include credentials (cookies), default value is [true].
   */
  createOptions(
    method: HttpRequestMethod,
    headers: HttpHeaders,
    url: string,
    body: any,
    withCredentials: boolean = true
  ): HttpRequestOptions {
    let options: HttpRequestOptions;
    options = new HttpRequestOptions();
    options.requestMethod = method;
    options.headers = headers;
    options.requestUrl = url;
    options.body = body;
    options.withCredentials = withCredentials;
    return options;
  }
 
  /**
   * Use to create a new [HttpHeaders] object for the HTTP/API request.
   */
  createHeader(): HttpHeaders {
    let headers = new HttpHeaders();
    headers = headers.set("Content-Type", "application/json");
    return headers;
  }
 
  /**
   * Use to execute an HTTP request using the specified options in the [HttpRequestOptions].
   * @param requestOptions
   */
  execute<T>(requestOptions: HttpRequestOptions): Observable<ApiResponse<T>> {
    console.log(
      `Preparing to perform request to: ${requestOptions.requestUrl}`
    );
    return this.httpClient
      .request<T>(
        requestOptions.requestMethod.toString(),
        requestOptions.requestUrl,
        {
          body: requestOptions.body,
          headers: requestOptions.headers,
          reportProgress: requestOptions.reportProgress,
          observe: requestOptions.observe,
          params: requestOptions.params,
          responseType: requestOptions.responseType,
          withCredentials: requestOptions.withCredentials
        }
      )
      .pipe(
        retry(1),
        catchError((errorResponse: any) => {
          return this.handleError(errorResponse);
        })
      );
  }
 
  /**
   * Use to handle errors during HTTP/Web API operations. The caller expects
   * an Observable response - this method will either return the response from
   * the server or a new [ErrorApiResponse] as an Observable for the client to
   * handle.
   *
   * @param error The error from the HTTP response.
   */
  protected handleError(error: HttpErrorResponse): Observable<any> {
    const apiErrorResponse = new ErrorApiResponse();
    apiErrorResponse.IsSuccess = false;
    apiErrorResponse.Timestamp = new Date(Date.now());
    apiErrorResponse.Message = "Unexpected HTTP error.";
 
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      apiErrorResponse.Errors.push(
        new ApiErrorMessage(
          `A client-side or network error occurred. Handle it accordingly.`,
          true,
          null,
          null
        )
      );
      return throwError(apiErrorResponse);
    } else {
      // The API returned an unsuccessful response.
      if (error instanceof ErrorApiResponse) {
        // A known error response format from the API/Server; rethrow this response.
        return throwError(error);
      } else {
        // An unhandled error/exception - may not want to lead/display this information to an end-user.
        // TODO: MIGHT WANT TO LOG THE INFORMATION FROM error.error;
        apiErrorResponse.Errors.push(
          new ApiErrorMessage(
            `The API returned an unsuccessful response. ${error.status}: ${error.statusText}. ${error.message}`,
            false,
            null,
            error.status.toString()
          )
        );
        return throwError(apiErrorResponse);
      }
    }
  }
}
```
 
<!-- ## Common Library
 
Also the [API response schema](#api-response-schemamodel) can be defined in a common library that can be re used by many different applications or other libraries that require the ability to handle a response from the back end server.
 
We are talking about organizing code in such a way that it can be shared and reused by many different applications or libraries. Typically, many teams and application developers put all of these services and cross-cutting concerns in this specific domain application project. Putting these types of items in a domain application does not allow them to be shared or reused by other applications or libraries. It is the same code, however, when it is in the wrong location it cannot be shared. Most likely developers copy and paste the code wherever it is needed. Can you say, "Technical Debt!"? -->
 
<!-- ## HTTP Interceptors -->
 
<!-- @@WORK: ADD CONTENT HERE -->
 