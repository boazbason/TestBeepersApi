export const middle1 = (req: any, res: any, next: any) => {
    console.log("middle1");
    next();
}
