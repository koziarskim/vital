package com.vital.web.domain;

import com.google.common.base.Objects;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;

@Entity
@Table(name = "DAILY_NOTE", schema = "PUBLIC")
public class DailyNote implements Serializable {

    @Id
    @Column(name = "ID", length = 36)
    //@GeneratedValue(generator = "entity-delegating")
    //@GenericGenerator(name = "entity-delegating", strategy = "com.vital.web.domain.EntityDelegatingGenerator")
    //@Access(AccessType.PROPERTY)
    String id;

    @Column(name = "DESCRIPTION")
    private String description;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
