
export class TodoEntity {

    constructor(
        public readonly id: Number,
        public readonly text: String,
        public readonly completedAt?: Date|null
    ) {}

    get isCompleted() {
        return !!this.completedAt;
    }

    static fromObject ( object: {[key: string]: any}): TodoEntity {
        const { id, text, completedAt } = object;

        if ( !id ) throw 'Id is required';
        if ( !text ) throw 'Text is required';

        let newCompletedAt;

        if( completedAt ){
            newCompletedAt = new Date(completedAt);

            if ( isNaN( newCompletedAt.getTime() ) ) {
                throw 'CreatedAt is not a valid date';
            }
        }

        return new TodoEntity( id, text, completedAt );
    }
}