package com.educhat.backend.tests;



import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.time.Duration;

public class DemoSeleniumTest {
    WebDriver driver;

    @BeforeEach
    public void setup(){
        driver = new ChromeDriver();
    }

    @Test
    public void initialTest(){
        driver.manage().timeouts().implicitlyWait(Duration.ofMillis(500));

        driver.get("http://localhost:5173/home");
        String homeTitle = driver.getTitle();
        WebElement loginButton = driver.findElement(By.cssSelector("button"));


    }
//
//    @AfterEach
//    public void tearDown(){
//        driver.quit();
//    }
}
