import fs from "fs";

class Container {
    // paso1:hacer el constructor
    constructor(fileName){
        this.filePath = `./${fileName}.json`;
            
        }
     //paso2: hacer el metodo   
        async getAll(){
            try{
                const file = await fs.promises.readFile(this.filePath, "utf8");
                const elements = JSON.parse(file);

                return elements;

            } catch(error) {
            console.log(error);
            if(error.code === 'ENOENT'){
                await fs.promises.writeFile(this.filePath, JSON.stringify([], null, 3));
                return[];
            }
            console.log(error);

            
        }
    
    }
  
    async save(element) {
        try {
          const elements = await this.getAll();
    
          const id =
            elements.length === 0 ? 1 : elements[elements.length - 1].id + 1;
    
        
    
          element.id = id;
    
          elements.push(element);
    
          await fs.promises.writeFile(
            this.filePath,
            JSON.stringify(elements, null, 3)
          );
    
          return element.id;
        } catch (error) {
          console.log(error);
        }
      }
    
      async getById(id) {
        try {
          const elements = await this.getAll();
    
          const foundElement = elements.find((element) => element.id == id);
    
          if (!foundElement) return null;
    
          return foundElement;
        } catch (error) {
          console.log(error);
        }
      }
    
      async deleteById(id) {
        try {
          const elements = await this.getAll();
    
          const foundElement = elements.find((element) => element.id == id);
          
    
          if (!foundElement) return "Element not found";
              
          const filterElements = elements.filter((element) => element.id != id);
    
          
    
          await fs.promises.writeFile(
            this.filePath,
            JSON.stringify(filterElements, null, 3)
          );
        } catch (error) {
          console.log(error);
        }
      }
    
      async deleteAll() {
        try {
          await fs.promises.writeFile(this.filePath, JSON.stringify([], null, 3));
        } catch (error) {
          console.log(error);
        }
      }
    
      async update({ id, newData }) {
        try {
          const elements = await this.getAll();
    
          const foundElementIndex = elements.findIndex(
            (element) => element.id == id
          );
    
          if (foundElementIndex === -1) return "Element not found";
          const foundElement = elements[foundElementIndex];
    
          for (const key in newData) {
            if (foundElement.hasOwnProperty(key)) {
              foundElement[key] = newData[key];
            }
          }
    
          await fs.promises.writeFile(
            this.filePath,
            JSON.stringify(elements, null, 3)
          );
        } catch (error) {
          console.log(error);
        }
      }
    }
    
    export { Container };


  