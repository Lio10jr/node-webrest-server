
export class UpdateTodoDtos {
    private constructor(
        public readonly id: number,
        public readonly text?: string,
        public readonly completedAt?: Date
    ){}

    get values() {
        const returnObject: {[key: string]: any} = {};

        if ( this.text ) returnObject.text = this.text;
        if ( this.completedAt ) returnObject.completedAt = this.completedAt;

        return returnObject;
    }

    static update(props: {[key: string]: any}): [string?, UpdateTodoDtos?] {
        let { id, text, completedAt } = props;

        if ( !id || isNaN( Number(id)) ) return ["Id must be a valid number", undefined];

        if ( text ) {
            if (typeof text !== 'string') return ["Text property should be a string", undefined];
        }

        let newCompletedAt = completedAt;
        
        if ( completedAt ) {
            newCompletedAt = new Date(completedAt);
            if( newCompletedAt.toString() === "Invalid Date")
                return ["CompletedAt must be a valid date"];
        }

        return [undefined, new UpdateTodoDtos(id, text, newCompletedAt)]
    }
}