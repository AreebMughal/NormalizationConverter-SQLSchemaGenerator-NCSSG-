CREATE TABLE `f`.`practice` ( 
    `pnum` INT NOT NULL ,  
    `ssn` INT NOT NULL ,  
    `name` INT NOT NULL ,    
    PRIMARY KEY  (`pnum`, `ssn`),    
    UNIQUE  (`name`)
) ENGINE = InnoDB;

CREATE TABLE `f`.`Pra_email` ( 
    `pnum` INT NOT NULL ,  
    `ssn` INT NOT NULL ,  
    `email` INT NOT NULL ,    
    PRIMARY KEY  (`pnum`, `ssn`, `email`)
) ENGINE = InnoDB;

ALTER TABLE `pra_email` 
    ADD FOREIGN KEY (`pnum`, `ssn`) 
    REFERENCES `practice`(`pnum`, `ssn`) 
    ON DELETE CASCADE ON UPDATE CASCADE;