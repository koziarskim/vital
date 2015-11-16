package com.vital.web.data;

import org.springframework.boot.autoconfigure.jdbc.TomcatDataSourceConfiguration;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;

import javax.sql.DataSource;

/**
 * Created by marcin.koziarski on 11/16/2015.
 */

@Configuration
@ConfigurationProperties(prefix = "spring.ds_primary") //Defines property name.
public class DatabaseConfig extends TomcatDataSourceConfiguration {

    @Bean(name = "primaryDataSource")
    public DataSource dataSource() {
        return super.dataSource();
    }

    @Bean(name = "primaryJdbcTemplate")
    public JdbcTemplate jdbcTemplate() {
        return new JdbcTemplate(dataSource());
    }

}
