export type ConfidenceUnionType = "ONE" | "TWO" | "THREE" | "FOUR" | "FIVE"

export interface PatternI {
    name: string,
    category: string,
    trigger: string,
    problem: string,
    solution: string,
    examples: string[],
    confidence: ConfidenceUnionType
}