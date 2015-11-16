package com.vital.web.domain

import org.hibernate.HibernateException
import org.hibernate.engine.SessionImplementor
import org.hibernate.engine.spi.SessionImplementor
import org.hibernate.id.IdentifierGenerator

class EntityDelegatingGenerator implements IdentifierGenerator {
    Serializable generate(SessionImplementor session, Object object) throws HibernateException {
        if (object instanceof IdentifierGenerator) {
            return object.generate(session, object)
        } else {
            throw new IllegalArgumentException("This generator can only be used on entities that implement org.hibernate.id.IdentifierGenerator")
        }
    }
}
