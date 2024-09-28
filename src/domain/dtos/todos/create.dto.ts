

export class CreateTodoDtos {
    private constructor(
        public readonly text: string,
        public readonly completedAt: Date
    ) { }

    static create(props: { [key: string]: any }): [string?, CreateTodoDtos?] {
        let { text, completedAt } = props;
        
        if ( !text || text.length === 0 ) return ["text property is required", undefined];

        if ( typeof text != 'string') return ["text property should be a String value", undefined];

        if ( completedAt ) {
            completedAt = new Date(completedAt);
            if( completedAt.toString() === "Invalid Date")
                return ["CompletedAt must be a valid date", undefined];
        } else {
            completedAt = new Date();
        }

        return [undefined, new CreateTodoDtos(text, completedAt)]
    }
}