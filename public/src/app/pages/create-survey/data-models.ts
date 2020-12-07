export class Survey {
    constructor(
        // public id: number,
        public user: string,
        public type: string,
        public title: string,
        public expirydate: Date,
        public questionnaires: Question[]

    ) { }
}

export class Question {
    constructor(
        // public id: number,
        public questiontype: string,
        public questiontitle: string,
        public options: Option[],
    ) { }
}

export class Option {
    constructor(
        // public id: number,
        public optiontext: string,
        public optioncolor: string
    ) { }
}


export class Category {
    constructor(public id: number,
        public name: string,
        public hasSubCategory: boolean,
        public parentId: number) { }
}

export class Product {
    constructor(public id: number,
        public name: string,
        public images: Array<any>,
        public oldPrice: number,
        public newPrice: number,
        public discount: number,
        public ratingsCount: number,
        public ratingsValue: number,
        public description: string,
        public availibilityCount: number,
        public color: Array<string>,
        public size: Array<string>,
        public weight: number,
        public categoryId: number) { }
}
