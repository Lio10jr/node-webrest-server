
export class DeleteTodoDtos {

    private constructor(
        public readonly id: number
    ) {}

    static delete( props: {[key: string]: any}): [ string?, DeleteTodoDtos?] {
        const { id } = props;

        if ( !id || isNaN( Number(id) ) ) return ["Id must be a valid number"];

        return [undefined, new DeleteTodoDtos(id)]
    }
}