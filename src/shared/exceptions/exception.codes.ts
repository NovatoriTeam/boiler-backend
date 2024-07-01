/**
 * # Study Progress Exception Codes
 *
 * ## Naming Conventions
 *
 * <Entity Name>.<Stage error occurred in>.<Name of the Exception in all caps>
 *
 * ### Stages
 * - MAP => errors occuring during event mapping (typically in *-event.mapper.ts classes)
 * - LINK => errors occuring during linking of domain-likes into study-progress data (typically in services/providers)
 * - DOMAIN => errors occuring during updates of domain entities (typically in domain entities/aggregate roots)
 *
 * ### Context
 *
 * The following context should be provided to different error types:
 * - MAP => validated event data, e.g. CdcTableProfilStudium or CdcTableKbVorlesungen
 * - LINK => mapped event data (e.g. StudyProgressRequestData)
 * - DOMAIN => entity the update was executed on + invalid input data (e.g. StudyProgressEntityProps + invalidCurrentSemester)
 *
 * ## Why Exception Codes?
 *
 * Adding a `code` string with a custom status code for every exception is a good practice, since when that exception
 * is transferred to another process `instanceof` check cannot be performed anymore so a `code` string is used instead.
 * Code enum types can be stored in a separate file so they can be shared and reused on a receiving side.
 */
export enum ExceptionCodes {
  UNKNOWN_EXCEPTION = 'GENERIC.UNKNOWN_EXCEPTION',
  INPUT_VALIDATION_FAILED = 'GENERIC.INPUT_VALIDATION_FAILED',
  ARGUMENT_INVALID = 'GENERIC.ARGUMENT_INVALID',
  ARGUMENT_OUT_OF_RANGE = 'GENERIC.ARGUMENT_OUT_OF_RANGE',
  ARGUMENT_NOT_PROVIDED = 'GENERIC.ARGUMENT_NOT_PROVIDED',
  CARE_REPORT_FAILED = 'GENERIC.CARE_REPORT_FAILED',
}
